---
name: canonical-test-command
description: "Always run tests via bin/test.sh (--grep/--seed/--seeds/--quiet/--reporter flags) — never npm test, node bin/run-tests.js, shell loops, or output-filter pipes"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7c0927fd-5ca8-4322-83bf-907c13b976e8
  modified: 2026-09-14T23:24:40.760Z
---

Run the test suite ONLY as `bin/test.sh`, via the Bash tool, as a single plain command — no `for` loops, no pipes, no `2>&1 | grep` filtering. The flags cover every need: `--grep "<spec title>"` (filter specs), `--seed <seed>` (fixed-seed repro), `--seeds 11,222,3333` (one run per seed with one-line summaries), `--quiet` (summary lines only; failing runs still dump full output), `--reporter dot` (added 2026-09-14: dots plus failure details only, for when a failing full run overflows the tool output cap).

**Why:** The desktop app prompted for permission on every test-command variation (`npm test`, `node bin/run-tests.js`, `SEED=... node ...` env prefixes, shell loops, multi-seed `for` loops piped to `grep`), because compound commands defeat the `Bash(bin/test.sh:*)` prefix-match in the allowlist. On 2026-08-06 the user asked that any missing capability be added to the script itself instead of composed on the command line; `--seeds` and `--quiet` were added to bin/run-tests.js for exactly this.

**How to apply:** Never invoke `npm test`, `node bin/run-tests.js`, or PowerShell test commands directly, and never wrap bin/test.sh in loops or pipes — use the flags. Use `--seed N` instead of a `SEED=N` env prefix. If the script can't do something needed (a new output mode, a new run mode), extend bin/run-tests.js rather than composing shell — that's the user's standing preference. Repeated random-seed soak runs use `node bin/soak-tests.js` (also allowlisted). Related: [[headless-test-runner]].
