---
name: save-load-task174
description: "Task 174 save/load branch — review fixes shipped, save-file validation/migrations deliberately deferred"
metadata: 
  node_type: memory
  type: project
  originSessionId: c46f3040-3f85-49ea-abc4-2399ad66c3b7
  modified: 2026-08-10T23:07:28.282Z
---

Branch `174-save-and-load` (reviewed 2026-08-10): save/load between loaded/unloaded game states. Review fixes shipped: GameSystem.endGame() + Views.endGame() replace quitToMainMenu (game-over.js routes through it), MainMenu.open() calls adjustGameMenu(), startNewGame calls openGame() before the fixture early-return, MainMenu.close() removes itself from the WindowManager stack.

Deliberately deferred (user decision, not misses): loadBaseMenu crashes if worldState.previousGame has no savedGames entry, and FileHelper.readJSON never rejects (missing save file hangs loadGame). User plans to eventually validate world state against the files in `DATA/Saves` and add save-file migrations for version changes — "all for another day". Load overlay ([[load-overlay]] view) is still a placeholder stub. Save version check is strict equality against Environment.version (now read from Electron/package.json 0.1.8).
