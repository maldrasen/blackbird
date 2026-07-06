# Task 100: Character Creation Story Sequence

## Context
Task 100 ("Game Start Event", [docs/tasks/100-game-start-event.md](tasks/100-game-start-event.md)) describes the full new-game experience: a character-creation story sequence, attribute-appropriate starting equipment, an "accept death" meta mechanic, a persistent "lineage" save system, and a second unlockable scenario. That's five largely independent systems — too much for one implementation pass.

This plan covers **only the character-creation story sequence**: a short narrative of "stories from the character's past" where each choice nudges attributes, the final story also grants an aspect, the player is then named, and the flow ends by actually creating the `Player` entity and dropping them into a placeholder home location. Starting equipment (the `OutfitFactory` stub), the accept-death mechanic, and lineage persistence are explicitly deferred to future tasks — the character will end this flow with empty equipment/inventory, which is fine for now.

**Design note (superseded a "Quirk" system):** an earlier pass of this plan added a brand-new `Quirk` record + `QuirksComponent` for the final story's payoff. On reflection there's no real difference yet between a "quirk" and an existing `Aspect` (`application/components/aspect-component.js`) — both are just open-ended character tags with no mechanics attached today (aside from `premature`, which already reduces the orgasm threshold). Rather than stand up a parallel system, the final story just grants an aspect via the existing trigger syntax. A real gap this surfaced: `AspectType` (`application/enums.js`) is just a bare enum with no record backing it — there's nowhere to hang a name/description, or to mark whether an aspect is binary or leveled. Building that (an `Aspect` data record, analogous to `Species`/`Location`) is a good follow-up but is **out of scope for this task** — for now the story just uses whichever of the existing three aspect codes (`flexible`/`premature`/`productive`) fits, as a placeholder pending that future record.

First playthrough is locked to human male (no species/gender choice), per the task doc.

## Existing systems being reused
- **Episode/narrative system** (`application/records/episode.js`, `application/episodes/episode-system.js`, `episode-state.js`, `episode-page.js`, `application/views/episodes/episode-view.js`) — already supports registering an episode with a linear `pages` array, per-page `contentFunction` + `buttons`, and `EpisodeSystem.setPropertyValue`/`getPropertyValue` for state that must persist across pages within one run. Branching is content-driven (a page's `contentFunction` reads previously-stored properties to decide what to show), matching how `data/episodes/propose-training.js` already works — no new branching infrastructure needed.
- **Trigger system** (`docs/reference/character-factory-triggers.md`, `AttributesFactory.adjustAttributes`) — attribute-nudging choices will push trigger strings (`strong`, `weak`, `smart`, `beautiful`, etc.) into an array, consumed by `AttributesFactory.adjustAttributes`. Aspect triggers (`code:level`, e.g. `premature:2`) live in the *same* triggers array and are already consumed by `AspectsFactory.build(triggers, actorData)`, which `PlayerFactory.build()` already calls — no new plumbing needed for the aspect grant, just pushing the right trigger string from story 3's button callback.
- **`GameController.openGame(setup)` / `Fixtures.setupX` idiom** (`application/test/fixtures.js`, `application/views/general/main-menu.js`) — reused to kick off the episode as the new game's setup step.

## Changes

### 1. ~~New `Quirk` record + `QuirksComponent`~~ — dropped, using existing Aspects instead
No new record/component needed. `PlayerFactory.build()` already threads `triggers` into `AspectsFactory.build()` → `AspectsComponent.create()`, so story 3 just needs to push an aspect trigger string (`'premature:2'` or similar placeholder) into the same trigger list as the attribute choices from stories 1-2.

### 2. New episode: `data/episodes/character-creation.js` (structure only — no prose)
You're writing all the episode text yourself. This plan builds the working scaffold (registration, pages array, button wiring, trigger/property threading, `endFunction`) with placeholder `contentFunction`s (e.g. `'TODO: story 1 text'`) and placeholder button labels/trigger choices, so the mechanism is fully testable before any real prose exists. You'll replace the placeholder strings and pick the real attribute triggers per choice; grammar/consistency review is available once drafted, but the narrative content itself is not to be authored by the assistant.

Single episode, `layout: 'centered'` (matches the one real precedent, `propose-training.js`; centered's simple `#episodePage`/`#episodeButtons` split works fine for a page containing a text input too). Explicitly set `background: 'backgrounds/wood.jpg'` (placeholder — `Episode.lookup().getBackground()` falls back to the *current* location's background otherwise, which would incorrectly show the filthy-hovel image since `GameState` always has a location set).

Five pages in one linear array:
1. **Story 1** — father-vanished-in-the-dungeon / mother's other kids framing; 2-3 buttons, each pushes an attribute trigger and calls `EpisodeSystem.nextPage()`.
2. **Story 2** — older brother left to become an adventurer, family home in Wolgur sat empty ~15 years; same pattern.
3. **Story 3 (aspect selection)** — traveling to Wolgur, finding the home in ruins with a squatter's camp and no brother, landing on the sheep accusation; 2-3 buttons, each pushes an aspect trigger (placeholder codes from the existing `flexible`/`premature`/`productive` set until a real `Aspect` record exists) into the same trigger list and calls `nextPage()`.
4. **Naming page** — literal HTML with `<input id='characterNameInput'>`, one submit button. Reading `.value` directly off the DOM element inside a button callback is an existing pattern (`application/views/general/console-commands.js`).
5. *(no 5th page — naming's callback calling `nextPage()` walks off the end of the array, which already triggers `endEpisode()` per `EpisodeState.getNextPage()`/`EpisodeSystem.nextPage()`.)*

State threading: because each button's `callback` is a bare function reference (same as `propose-training.js`), the growing trigger list is **not** kept as file-local module state — it's stored via `EpisodeSystem.setPropertyValue('triggers', [...])` (append-and-restore each time), since episode properties are exactly the mechanism designed for this and avoids any stale-state risk across repeated runs in the same process (relevant for tests / dev hot-reload).

`endFunction` (`finishCharacterCreation`):
```js
function finishCharacterCreation() {
  const triggers = EpisodeSystem.getPropertyValue('triggers') || [];
  const name = EpisodeSystem.getPropertyValue('name');

  const playerId = PlayerFactory.build({ name, triggers });

  GameState.setPlayer(playerId);
  GameState.setCurrentLocation('family-home-living-room');
  GameState.setGameMode(GameMode.location);
}
```
The aspect from story 3 rides along inside `triggers` (as an aspect-syntax string) exactly like the attribute triggers from stories 1-2 — no separate property needed.

### 3. `PlayerFactory.build()` changes (`application/characters/factories/player-factory.js`)
- Accept `options.name`, falling back to `'Greg'` (unchanged default for fixtures/tests that don't pass one).
- **Bug fix / gap**: call `AttributesFactory.adjustAttributes(attributesData, triggers)` right after `rollAttributes` and before `rollHealth` — mirroring `CharacterFactory.buildLoop()`. Today `PlayerFactory` threads `triggers` through to aspects/skills/body factories but never applies attribute-adjusting triggers at all, so `strong`/`weak`/etc. are silently no-ops for the player currently.
- No quirks option — aspects already flow through the existing `AspectsFactory.build(triggers, actorData)` call further down in `build()`.
- Stay lenient: do **not** add `CharacterFactory`-style "Unresolved Triggers" throw — leave any unconsumed trigger string to pass through silently, since this is a small hand-authored set.

### 4. New location: `data/locations/family-home-living-room.js`
```js
Location.register('family-home-living-room', {
  name: 'A Ruined Living Room',
  background: 'backgrounds/wood.jpg', // placeholder, no dedicated art yet
});
```
`LocationView` needs no changes — it already reads name/background/present-characters generically.

### 5. Wiring the new game flow — done
Revised during implementation (see below): rather than a standalone `GameStart` module invoked as `openGame`'s `setup` argument, starting character creation is `GameController.startNewGame()`'s own responsibility, since a genuinely new game always begins that way — it's the fixture path that's the exception now, not the other way around. `openGame()` no longer takes a `setup` argument at all; that concept moved into `startNewGame(options)`.

`application/world/game-controller.js`:
```js
async function startNewGame(options={}) {
  GameState.initialize(options);

  if (options.setup) { return options.setup(); }

  EpisodeSystem.startEpisode(getGameStartEpisode(), {});
  GameState.setGameMode(GameMode.episode);
}

// TODO: Once a lineage exists this should return whatever scenario the
//       lineage has unlocked instead of always the first one.
function getGameStartEpisode() {
  return 'character-creation';
}

async function openGame() {
  console.clear();
  MainContent.showCover();
  MainContent.removeStylesheet('mocha');
  MainContent.hideCover({ fadeTime:2500 });
}
```
`getGameStartEpisode()` is the single indirection point that will later consult the lineage's unlocked scenarios instead of always returning `'character-creation'`. Once that lookup is real, `startNewGame()` will need to actually be `async` (reading lineage state), unlike today where none of `GameController`'s functions are truly asynchronous yet.

`application/views/general/main-menu.js`:
- `startGame()`: `close(); await GameController.startNewGame(); await GameController.openGame();` — no setup, defaults to character creation.
- `startFixture()`: builds its `setup` function same as before, but now passes it through `startNewGame({ setup })` instead of `openGame(setup)`: `await GameController.startNewGame({ setup }); await GameController.openGame();`
- `continueGame()` is untouched — it never calls `startNewGame()`.

### 6. Prose
All of the episode text (story `contentFunction`s in `character-creation.js`) is hand-written, not generated. The plan only scaffolds placeholder text so the structure is complete and testable.

## Verification
- **`bin/run-headless.js`** excludes everything under `application/views/*`, so episode/DOM-driven flows can't be exercised headless — but the underlying logic can, since `GameState.setGameMode()` only calls `*View.show()` when `HEADLESS === false`.
- Add `test/characters/factories/player-factory-spec.js` (mirrors existing `character-factory-spec.js`): asserts `options.name` is used, `options.triggers` actually nudges attributes, and an aspect trigger (`code:level`) in `options.triggers` populates `AspectsComponent`.
- Add `test/world/game-start-spec.js`: drives the episode headlessly — `GameState.reset()`, `EpisodeSystem.startEpisode('character-creation', {})`, manually set the same properties a real playthrough would (`triggers` including an aspect trigger, `name`), call `Episode.lookup('character-creation').getEndFunction()()` directly, then assert `GameState.getPlayer()` exists with the right name, `GameState.getCurrentLocation() === 'family-home-living-room'`, and `GameState.getGameMode() === GameMode.location`.
- Run via the existing `bin/run-tests.js` (Mocha, in-app).
- After adding files, rerun `bin/compile-manifest.sh` (auto-scans `application/`, `data/`, `test/`) before launching via `bin/start.sh`.
- Manual smoke test: `bin/start.sh`, click "Start Game" on the main menu, click through all 3 stories + naming, confirm the game lands on the "A Ruined Living Room" location with the named player character.

## Explicitly out of scope (future tasks)
- An `Aspect` data record (name/description, binary-vs-leveled) analogous to `Species`/`Location` — flagged during this task but not built here.
- Starting equipment / `OutfitFactory` implementation.
- Accept-death mechanic.
- Lineage/persistent save system (`WorldState` meta-progression, household upgrades).
- Second scenario (sibling character, expanded aspect options).

## Progress
- [ ] 1. ~~`Quirk` record + `QuirksComponent`~~ — dropped; story 3 uses an existing aspect trigger instead, no new record/component needed
- [x] 2. `data/episodes/character-creation.js` scaffold
- [x] 3. `PlayerFactory.build()` changes (name, adjustAttributes)
- [x] 4. `data/locations/family-home-living-room.js`
- [x] 5. `game-controller.js` + `main-menu.js` wiring (no standalone `GameStart` module — see revised section 5 above)
- [~] 6. Tests — skipped for now. Manual smoke test confirmed the flow works end to end (episode → triggers/name accumulation → `PlayerFactory.build()` → location placement). A generic "doesn't blow up" spec wouldn't have caught the `adjustAttributes` gap anyway; these paths will get plenty of exercise through actual play. Revisit if a similar silent-no-op bug shows up again.

## Next session
Pick back up once the episode's real prose (stories 1-3 + naming) is written in `data/episodes/character-creation.js`, replacing the `TODO` placeholder text and button labels. At that point:
- Story 3's placeholder aspect triggers (`flexible:1`/`premature:1`/`productive:1`) will need revisiting — likely once the `Aspect` data record (name/description, binary-vs-leveled) mentioned earlier exists.
- The placeholder `wood.jpg` background (episode + `family-home-living-room` location) may want real art.
