# suture-demo-api

A sandbox repo for the [suture](https://github.com/VinceKLW/Suture) demo.

CI on `main` is red on purpose: `index.js` loads `node-fetch` with `require()`, and node-fetch 3 is ESM-only, so
the build fails with `ERR_REQUIRE_ESM`. During the demo, suture recalls a verified past fix for this exact failure,
opens a PR here on a `recovery/<action_id>` branch, waits for CI to go green and only then marks the fix verified.

Every PR suture opens carries an `<!-- action-id: ... -->` marker so a crashed worker can find it again instead of
opening a second one.
