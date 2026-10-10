---
name: remove-electron-test-runner
description: Task 133 done — in-app mocha runner removed; bin/start.sh runs specs headlessly before Electron
metadata: 
  node_type: memory
  type: project
  originSessionId: a4ecc0a5-4315-4b6c-8a20-419ba6057165
  modified: 2026-07-24T18:49:27.683Z
---

Task 133 completed 2026-07-24 (branch `133-remove-tests-from-electron`). The in-app mocha runner is gone:
`bin/start.sh` now runs `node bin/run-tests.js` between manifest compile and `npm run start` — failures print to
the terminal (with repro seeds) but don't block launch, the user's explicit choice. This resolved the old
main-menu/suite race (fixture clicks draining Random stubs). `application/test/tests.js` was slimmed to only the
headless-shared half (root hooks, reset, running()) and must stay in the manifest fileList: renderer guards in
battle-interface, training-interface, game-system, and console still call `Tests.running()`. The `#testFrame` UI,
test-framework.scss, and MainContent.removeStylesheet were deleted. Headless runners are canonical — see
[[headless-test-runner]].
