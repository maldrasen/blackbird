---
name: project-episode-queue-task110
description: "Task 110 episode queue — single queue on GameState, metadata on Episode record, seed comes from scenario not from all-registered"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6fbbd995-808b-4f83-bc7a-213074307bd0
  modified: 2026-08-08T21:43:50.865Z
---

Task 110 SHIPPED 2026-08-08 (branch 110-navigation-events). Town movement can be interrupted by queued episodes.

- **Single queue**, not per-district/location queues (user decision): `GameState.episodeQueue` = array of `{code, place}` where place is `'global'` / `'district:x'` / `'location:x'`. Behavior (chance/priority/requires/repeat/removeWhen/on) always read from the Episode record's `queue` metadata at evaluation time — state stores identity+placement only.
- Ranking: priority desc → specificity desc (location > district > global) → queue position asc; walk until requires + `Random.roll(100) < chance` pass; at most one fires per move; once-only winners removed; `removeWhen` prunes matching entries without firing.
- `on:'enter'|'move'|'any'` moment filter applies to district/global entries only.
- **Seeding is NOT "all episodes with metadata"** (user corrected this): queue starts from `GameSystem.getStartingEpisodes()` (empty; scenario-driven later, like getGameStartEpisode). `EpisodeQueue.seed(codes)` takes an explicit list. Dev testing: user pushes debug episodes via `Fixtures.setupTraining`.
- Hook: `arriveAt()` returns `{episode}`; NavigationOverlay's `startQueuedEpisode` does startEpisode → markReturnMode → setGameMode(episode). `LocationView.update()` in arriveAt now guarded HEADLESS/Tests.running (global absent headless — surfaced by first-ever navigation specs).
- `data/episodes/debug-strange-mist.js` is a TEMP placeholder exercising every queue option; replaced by task 131's oath episode ([[project-dungeon-navigation]] style descriptor pattern).
- Episodes registered without explicit `layout` crash on render (default 'novel' template lacks #episodePage) — always set layout.
