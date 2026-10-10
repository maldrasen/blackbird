---
name: project-view-decoupling-task175
description: Task 175 — finish system/view interface seams for full headless play; bot driver is a separate follow-on
metadata: 
  node_type: memory
  type: project
  originSessionId: 0d7f1a1d-1db9-4d39-b73b-0db43a6baa06
  modified: 2026-08-10T23:58:41.501Z
---

Created 2026-08-10 after user asked for an honest assessment of whether headless-playability was worth the reengineering. Verdict: yes, and it's ~80% done already — the `*-interface.js` seam pattern (battle/training/negotiation) just needs finishing.

Task 175 (`docs/tasks/175-decouple-systems-from-views.md`, priority 2, 5pt) scope: seam GameSystem setGameMode/openGame/endGame, EpisodeSystem→EpisodeView, NavigationSystem→LocationView; consolidate HEADLESS/Tests.running() guards into interfaces only (shared `Interface.clientAttached()`-style predicate); remove saveGame HEADLESS early-return (save/load currently untestable headless); add a manifest-walking guardrail spec banning view references outside application/views (exemptions: *-interface.js, loader.js, browser-shim.js, maybe dungeon-commands.js which is client-only console commands).

Deliberately out of scope: the HeadlessDriver bot (a peer of the view layer consuming system return values like moveToFeature's `{encounter}`) and seeded bot playthroughs — user said "at least for the remaining decoupling", follow-on task later.

Also decided: keep the no-bundler global-object loader — it IS the mod loader and migrating to ESM/bundler was judged a negative-value refactor. Related: [[project-gamestate-view-coupling]].
