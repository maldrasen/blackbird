---
name: project-game-start-event-task100
description: "Status of task 100 (Game Start Event) — character-creation story sequence scaffold, what's built, what's deferred."
metadata: 
  node_type: memory
  type: project
  originSessionId: d7f15162-5f20-4883-ad91-939703673df8
---

Task 100 ([docs/tasks/100-game-start-event.md](../../../../../D:/Work/projects/blackbird/docs/tasks/100-game-start-event.md)) covers five largely independent systems: character-creation story sequence, starting equipment, accept-death mechanic, lineage/persistent save, second scenario. Work is scoped to **only the character-creation story sequence** for now; the rest are separate future tasks. Full working plan (kept up to date as scope/design changes) lives in `docs/100-game-start-event-plan.md` in the repo itself, not just here.

**Built so far:**
- `data/episodes/game-start-1.js` (renamed from `character-creation.js`) — episode with 2 story choices (goal + memory, each nudging an attribute) + a naming page + a completion page. Story buttons push trigger strings into an `EpisodeSystem` property (`triggers`). Real prose is now written (grammar-reviewed 2026-07-08). Note the aspect grant deviated from the plan: instead of a trigger from "story 3", the `animal-attraction` aspect is granted in `finishCharacterCreation` by direct component mutation when the player leaves the given name as the guard's "Sheepfucker" insult. This mutation bypasses `validateData` but now lands on a valid canonical code.
- `data/locations/family-home-living-room.js` — placeholder end-of-episode location, reuses `wood.jpg` background (no dedicated art yet).
- `application/characters/factories/player-factory.js` — fixed a real gap: `PlayerFactory.build()` threaded `triggers` through to aspects/skills/body factories but never called `AttributesFactory.adjustAttributes()`, so attribute triggers (`strong`/`weak`/etc.) were silently no-ops for the player. Now calls it right after `rollAttributes()`. Also now accepts `options.name`.
- `application/world/game-controller.js` — `startNewGame(options)` now defaults to starting the game-start episode (via a `getGameStartEpisode()` indirection, currently hardcoded to `'character-creation'`, flagged TODO to consult lineage-unlocked-scenarios once that exists) unless `options.setup` is given; `openGame()` dropped its `setup` param (that responsibility moved into `startNewGame`). Fixtures now pass `{ setup }` through `startNewGame` instead of through `openGame`.

**Rejected during this pass:** a standalone `Quirk` record + `QuirksComponent` for the final story's payoff. On reflection there's no real difference yet between a "quirk" and the existing `AspectsComponent`/`AspectType` — both are open-ended character tags with no mechanics (aside from `premature`, which already reduces the orgasm threshold). Story 3 grants an aspect via the existing trigger syntax (`code:level`) instead, using placeholder codes (`flexible:1`/`premature:1`/`productive:1`) from the existing fixed `AspectType` enum.

**Aspect record — DONE (2026-07-08):** Built `application/records/aspect.js` (mirrors `StatusEffect`/`Species` records: register/lookup/getAllCodes, exposing name/description/isLeveled/getMaxLevel) + one data file per code in `data/aspects/` (`flexible`, `premature`, `productive` leveled maxLevel 3; `animal-attraction` binary). Codes are canonical kebab-case (matches enum *values*). `AspectsComponent.validateData` now validates against `Aspect.getAllCodes()` and per-aspect max level instead of `Object.keys(AspectType)` — which also fixed a latent mismatch where the component only accepted the camelCase enum *key* `animalAttraction` while the episode writes the enum *value* `animal-attraction`. `character-overview-panel.fillAspects` now shows `Aspect.lookup(code).getName()` instead of title-casing the raw key. `AspectType` enum kept as code constants (mirrors the Species enum+record dual pattern).

**Known follow-up work surfaced but explicitly deferred:**
- Tests were explicitly skipped — see [[feedback_stepwise_collaborative_implementation]] for why.
- Starting equipment (`OutfitFactory` stub), accept-death mechanic, lineage/persistent save system, second scenario: all untouched, separate future tasks.

**Next session:** episode prose is written and the Aspect record is built. Remaining task-100 pieces (starting equipment, accept-death, lineage, second scenario) are the separate deferred systems above.
