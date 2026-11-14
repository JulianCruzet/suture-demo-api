// A tiny CommonJS service. It pulls in node-fetch with require(), which works on
// node-fetch 2.x but breaks on 3.x (ESM-only): CI fails with ERR_REQUIRE_ESM.
const fetch = require("node-fetch");

function healthUrl(base) {
  return new URL("/health", base).toString();
}

async function checkHealth(base) {
  const res = await fetch(healthUrl(base));
  return res.ok;
}

module.exports = { healthUrl, checkHealth, fetch };
