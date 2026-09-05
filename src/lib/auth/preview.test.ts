import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as preview from "./preview.ts";
import { requireFederatedAuthCreds } from "./preview.ts";

describe("preview auth credentials", () => {
  it("does not export baked preview OAuth client constants", () => {
    assert.equal("PREVIEW_CLIENT_ID" in preview, false);
    assert.equal("PREVIEW_CLIENT_SECRET" in preview, false);
  });

  it("does not keep a committed preview client id or secret in source", () => {
    const source = readFileSync(fileURLToPath(new URL("./preview.ts", import.meta.url)), "utf8");
    assert.doesNotMatch(source, /PREVIEW_CLIENT_ID/);
    assert.doesNotMatch(source, /PREVIEW_CLIENT_SECRET/);
    assert.doesNotMatch(source, /[0-9a-f]{64}/);
  });

  it("fails closed when federated auth env vars are missing", () => {
    assert.throws(
      () => requireFederatedAuthCreds(() => undefined),
      /GROK_AUTH_CLIENT_ID, GROK_AUTH_CLIENT_SECRET, and BETTER_AUTH_SECRET/,
    );
    assert.throws(
      () =>
        requireFederatedAuthCreds((key) =>
          key === "GROK_AUTH_CLIENT_ID" ? "from-env" : undefined,
        ),
      /must be set in the environment/,
    );
    assert.throws(
      () =>
        requireFederatedAuthCreds((key) =>
          key === "BETTER_AUTH_SECRET" ? "   " : "from-env",
        ),
      /must be set in the environment/,
    );
  });

  it("reads federated creds from env when all required keys are set", () => {
    const creds = requireFederatedAuthCreds((key) => {
      if (key === "GROK_AUTH_CLIENT_ID") return " env-client ";
      if (key === "GROK_AUTH_CLIENT_SECRET") return "env-secret";
      if (key === "BETTER_AUTH_SECRET") return "env-better-auth";
      return undefined;
    });
    assert.deepEqual(creds, {
      clientId: "env-client",
      clientSecret: "env-secret",
      betterAuthSecret: "env-better-auth",
    });
  });
});
