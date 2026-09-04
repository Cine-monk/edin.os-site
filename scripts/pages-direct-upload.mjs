#!/usr/bin/env node
/**
 * Hash a Pages dist folder, upload missing assets with a JWT,
 * and write a manifest for the Cloudflare deployments API.
 *
 * Env:
 *   PAGES_JWT   short-lived upload token
 *   DIST_DIR    default ./dist
 *   OUT_MANIFEST default /tmp/pages-manifest.json
 */
import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, join, posix, relative } from "node:path";

const jwt = process.env.PAGES_JWT;
if (!jwt) {
  console.error("PAGES_JWT required");
  process.exit(1);
}

const dist = process.env.DIST_DIR || "dist";
const out = process.env.OUT_MANIFEST || "/tmp/pages-manifest.json";
const api = "https://api.cloudflare.com/client/v4";

function hashFile(buf) {
  return createHash("sha256").update(buf).digest("hex").slice(0, 32);
}

function contentType(file) {
  const ext = extname(file).toLowerCase();
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript",
      ".mjs": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".gif": "image/gif",
      ".mp4": "video/mp4",
      ".webm": "video/webm",
      ".xml": "application/xml",
      ".txt": "text/plain; charset=utf-8",
      ".ico": "image/x-icon",
      ".woff2": "font/woff2",
      ".map": "application/json",
    }[ext] || "application/octet-stream"
  );
}

async function walk(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_worker.js" || entry.name === "node_modules") continue;
      await walk(full, acc);
    } else if (entry.isFile()) {
      if (entry.name === "_worker.js" || entry.name === "_routes.json") continue;
      acc.push(full);
    }
  }
  return acc;
}

async function main() {
  const files = await walk(dist);
  const items = [];
  for (const file of files) {
    const buf = await readFile(file);
    const rel = "/" + relative(dist, file).split("\\").join("/");
    items.push({
      path: posix.normalize(rel).replace(/\\/g, "/"),
      hash: hashFile(buf),
      size: buf.length,
      type: contentType(file),
      buf,
    });
  }

  const hashes = [...new Set(items.map((item) => item.hash))];
  const missingRes = await fetch(`${api}/pages/assets/check-missing`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ hashes }),
  });
  const missingJson = await missingRes.json();
  if (!missingJson.success) {
    console.error("check-missing failed", missingJson);
    process.exit(1);
  }
  const missing = new Set(missingJson.result || []);
  console.log(`files ${items.length}; missing ${missing.size}`);

  const pending = items.filter((item) => missing.has(item.hash));
  const batchSize = 1;
  for (let i = 0; i < pending.length; i += batchSize) {
    const batch = pending.slice(i, i + batchSize);
    const body = batch.map((item) => ({
      key: item.hash,
      value: item.buf.toString("base64"),
      metadata: { contentType: item.type },
      base64: true,
    }));
    const res = await fetch(`${api}/pages/assets/upload`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwt}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!json.success) {
      console.error("upload failed", itemPath(batch), json);
      process.exit(1);
    }
    console.log(`uploaded ${i + 1}-${i + batch.length} / ${pending.length}`);
  }

  const manifest = {};
  for (const item of items) manifest[item.path] = item.hash;
  await writeFile(out, JSON.stringify(manifest));
  console.log(`manifest ${out} (${Object.keys(manifest).length})`);
}

function itemPath(batch) {
  return batch.map((item) => item.path).join(", ");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
