import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import worker from "../workers/edin-mcp/worker.js";

const workerPath = join(dirname(fileURLToPath(import.meta.url)), "..", "workers", "edin-mcp", "worker.js");

test("Worker source does not pair wildcard CORS with write methods", () => {
  const source = readFileSync(workerPath, "utf8");
  assert.doesNotMatch(
    source,
    /access-control-allow-origin["'\s:]*\*[\s\S]{0,200}access-control-allow-methods["'\s:]*[^"'\n]*(POST|PUT|PATCH|DELETE)/i,
  );
  assert.doesNotMatch(source, /access-control-allow-methods["'\s:]*[^"'\n]*\bPOST\b/i);
});

test("OPTIONS does not answer with write methods", async () => {
  const response = await worker.fetch(
    new Request("https://edinlabs.ai/", { method: "OPTIONS" }),
    {},
  );
  const methods = (response.headers.get("access-control-allow-methods") || "").toUpperCase();
  assert.doesNotMatch(methods, /\b(POST|PUT|PATCH|DELETE)\b/);
});

test("POST responses do not send access-control-allow-origin: *", async () => {
  const response = await worker.fetch(
    new Request("https://edinlabs.ai/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "ping" }),
    }),
    {},
  );
  assert.notEqual(response.headers.get("access-control-allow-origin"), "*");
});

test("GET /health still serves the MCP health payload", async () => {
  const response = await worker.fetch(new Request("https://edinlabs.ai/health"), {});
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.equal(body.mcp, "edin-labs-mcp");
});
