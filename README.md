# suture-demo-api

A sandbox repo for the [suture](https://github.com/VinceKLW/Suture) demo.

CI on `main` is red on purpose: `index.js` loads `node-fetch` with `require()`, and node-fetch 3 is ESM-only, so
the build fails with `ERR_REQUIRE_ESM`. During the demo, suture recalls a verified past fix for this exact failure,
opens a PR here on a `recovery/<action_id>` branch, waits for CI to go green and only then marks the fix verified.

Every PR suture opens carries an `<!-- action-id: ... -->` marker so a crashed worker can find it again instead of
opening a second one.

## Hardening for repeated incident runs

Two workflows keep the repo tidy no matter how many times a judge mashes the chaos button:

- **ci.yml** has a `concurrency` group keyed to the ref with `cancel-in-progress: true`. A fresh push on the same
  branch cancels any older CI run on that branch, so the Actions queue can't back up.
- **cleanup-recovery-branches.yml** fires on `pull_request: closed` and deletes the head branch when it starts with
  `recovery/`. Hand-made branches are untouched.
- **reset-demo.yml** is a manual `workflow_dispatch` — one click in the Actions tab closes every open `recovery/*`
  PR and deletes its branch. Run it before a demo recording to start from zero.

None of this touches `main`. The repo's red-CI premise is always intact; fresh clicks always find a broken
`main`, and the fix PR flow always produces a new branch + PR + CI run.
