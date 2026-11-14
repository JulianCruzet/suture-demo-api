const assert = require("node:assert");
const api = require("./index");

assert.strictEqual(typeof api.fetch, "function", "node-fetch should load as a function");
assert.strictEqual(api.healthUrl("https://example.com/api"), "https://example.com/health");
console.log("ok: 2 checks passed");
