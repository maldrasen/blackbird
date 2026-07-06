# Task 100: Character Creation Story Sequence

## Context
Task 100 ("Game Start Event", [docs/tasks/100-game-start-event.md](tasks/100-game-start-event.md)) describes the full new-game experience: a character-creation story sequence, attribute-appropriate starting equipment, an "accept death" meta mechanic, a persistent "lineage" save system, and a second unlockable scenario. That's five largely independent systems — too much for one implementation pass.

This plan covers **only the character-creation story sequence**: a short narrative of "stories from the character's past" where each choice nudges attributes, the final story also picks a "quirk," the player is then named, and the flow ends by actually creating the `Player` entity and dropping them into a placeholder home location. Starting equipment (the `OutfitFactory` stub), the accept-death mechanic, and lineage persistence are explicitly deferred to future tasks — the character will end this flow with empty equipment/inventory, which is fine for now.

First playthrough is locked to human male (no species/gender choice), per the task doc.

## Existing systems being reused
- **Episode/narrative system** (`application/records/episode.js`, `application/episodes/episode-system.js`, `episode-state.js`, `episode-page.js`, `application/views/episodes/episode-view.js`) — already supports registering an episode with a linear `pages` array, per-page `contentFunction` + `buttons`, and `EpisodeSystem.setPropertyValue`/`getPropertyValue` for state that must persist across pages within one run. Branching is content-driven (a page's `contentFunction` reads previously-stored properties to decide what to show), matching how `data/episodes/propose-training.js` already works — no new branching infrastructure needed.
- **Trigger system** (`docs/reference/character-factory-triggers.md`, `AttributesFactory.adjustAttributes`) — attribute-nudging choices will push trigger strings (`strong`, `weak`, `smart`, `beautiful`, etc.) into an array, consumed by `AttributesFactory.adjustAttributes`.
- **Record pattern** (`application/records/species.js`, `location.js`) — reused for a new `Quirk` record.
- **Component CRUD pattern** (`application/components/aspect-component.js`) — reused for a new, much simpler `QuirksComponent`.
- **`GameController.openGame(setup)` / `Fixtures.setupX` idiom** (`application/test/fixtures.js`, `application/views/general/main-menu.js`) — reused to kick off the episode as the new game's setup step.

## Changes

### 1. New `Quirk` record + `QuirksComponent` (no data files yet)
- `application/records/quirk.js` — copy the `Location`/`Species` register/lookup pattern: `Quirk.register(code, { name, description })`, `Quirk.lookup(code)`. Flavor only (name + description), no mechanical effect wired up.
- `application/components/quirks-component.js` — minimal component storing `{ quirks: [codes] }` on the player: `create`, `update`, `lookup`, `destroy`, `addQuirk`. No enum validation (quirks are open-ended content, unlike `AspectType`'s fixed leveled set).
- `application/enums.js` — add `quirks: 'QuirksComponent',` to the `ComponentType` map, alphabetically between the existing `pussy` and `sensitivities` entries (~line 104).
- **No `data/quirks/*.js` files in this pass.** You'll write the actual quirks (names/descriptions/how many) after drafting the episode's third story, since the quirk options need to match whatever that story ends up saying. Story 3's buttons will reference quirk codes as placeholders/TODOs until you supply real ones.

### 2. New episode: `data/episodes/character-creation.js` (structure only — no prose)
You're writing all the episode text yourself. This plan builds the working scaffold (registration, pages array, button wiring, trigger/property threading, `endFunction`) with placeholder `contentFunction`s (e.g. `'TODO: story 1 text'`) and placeholder button labels/trigger choices, so the mechanism is fully testable before any real prose exists. You'll replace the placeholder strings and pick the real attribute triggers per choice; grammar/consistency review is available once drafted, but the narrative content itself is not to be authored by the assistant.

Single episode, `layout: 'centered'` (matches the one real precedent, `propose-training.js`; centered's simple `#episodePage`/`#episodeButtons` split works fine for a page containing a text input too). Explicitly set `background: 'backgrounds/wood.jpg'` (placeholder — `Episode.lookup().getBackground()` falls back to the *current* location's background otherwise, which would incorrectly show the filthy-hovel image since `GameState` always has a location set).

Five pages in one linear array:
1. **Story 1** — father-vanished-in-the-dungeon / mother's other kids framing; 2-3 buttons, each pushes an attribute trigger and calls `EpisodeSystem.nextPage()`.
2. **Story 2** — older brother left to become an adventurer, family home in Wolgur sat empty ~15 years; same pattern.
3. **Story 3 (quirk selection)** — traveling to Wolgur, finding the home in ruins with a squatter's camp and no brother, landing on the sheep accusation; 3 buttons, one per quirk, each stores `EpisodeSystem.setPropertyValue('quirk', code)`.
4. **Naming page** — literal HTML with `<input id='characterNameInput'>`, one submit button. Reading `.value` directly off the DOM element inside a button callback is an existing pattern (`application/views/general/console-commands.js`).
5. *(no 5th page — naming's callback calling `nextPage()` walks off the end of the array, which already triggers `endEpisode()` per `EpisodeState.getNextPage()`/`EpisodeSystem.nextPage()`.)*

State threading: because each button's `callback` is a bare function reference (same as `propose-training.js`), the growing trigger list is **not** kept as file-local module state — it's stored via `EpisodeSystem.setPropertyValue('triggers', [...])` (append-and-restore each time), since episode properties are exactly the mechanism designed for this and avoids any stale-state risk across repeated runs in the same process (relevant for tests / dev hot-reload).

`endFunction` (`finishCharacterCreation`):
```js
function finishCharacterCreation() {
  const triggers = EpisodeSystem.getPropertyValue('triggers') || [];
  const name = EpisodeSystem.getPropertyValue('name');
  const quirk = EpisodeSystem.getPropertyValue('quirk');

  const playerId = PlayerFactory.build({ name, triggers, quirks: quirk ? [quirk] : [] });

  GameState.setPlayer(playerId);
  GameState.setCurrentLocation('family-home-living-room');
  GameState.setGameMode(GameMode.location);
}
```

### 3. `PlayerFactory.build()` changes (`application/characters/factories/player-factory.js`)
- Accept `options.name`, falling back to `'Greg'` (unchanged default for fixtures/tests that don't pass one).
- **Bug fix / gap**: call `AttributesFactory.adjustAttributes(attributesData, triggers)` right after `rollAttributes` and before `rollHealth` — mirroring `CharacterFactory.buildLoop()`. Today `PlayerFactory` threads `triggers` through to aspects/skills/body factories but never applies attribute-adjusting triggers at all, so `strong`/`weak`/etc. are silently no-ops for the player currently.
- Accept `options.quirks` (default `[]`), create `QuirksComponent.create(playerId, { quirks: options.quirks || [] })` alongside the other component creates.
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
All of the episode text (story `contentFunction`s in `character-creation.js`) and the `data/quirks/*.js` name/description fields (added later, once story 3 is drafted) are hand-written, not generated. The plan only scaffolds placeholder text so the structure is complete and testable.

## Verification
- **`bin/run-headless.js`** excludes everything under `application/views/*`, so episode/DOM-driven flows can't be exercised headless — but the underlying logic can, since `GameState.setGameMode()` only calls `*View.show()` when `HEADLESS === false`.
- Add `test/characters/factories/player-factory-spec.js` (mirrors existing `character-factory-spec.js`): asserts `options.name` is used, `options.triggers` actually nudges attributes, `options.quirks` populates `QuirksComponent`, and it defaults to no quirks.
- Add `test/world/game-start-spec.js`: drives the episode headlessly — `GameState.reset()`, `EpisodeSystem.startEpisode('character-creation', {})`, manually set the same properties a real playthrough would (`triggers`, `name`, `quirk`), call `Episode.lookup('character-creation').getEndFunction()()` directly, then assert `GameState.getPlayer()` exists with the right name/quirks, `GameState.getCurrentLocation() === 'family-home-living-room'`, and `GameState.getGameMode() === GameMode.location`.
- Run via the existing `bin/run-tests.js` (Mocha, in-app).
- After adding files, rerun `bin/compile-manifest.sh` (auto-scans `application/`, `data/`, `test/`) before launching via `bin/start.sh`.
- Manual smoke test: `bin/start.sh`, click "Start Game" on the main menu, click through all 3 stories + naming, confirm the game lands on the "A Ruined Living Room" location with the named player character.

## Explicitly out of scope (future tasks)
- Starting equipment / `OutfitFactory` implementation.
- Accept-death mechanic.
- Lineage/persistent save system (`WorldState` meta-progression, household upgrades).
- Second scenario (sibling character, expanded quirks).

## Progress
- [ ] 1. `Quirk` record + `QuirksComponent` + `ComponentType.quirks` enum entry
- [ ] 2. `data/episodes/character-creation.js` scaffold
- [ ] 3. `PlayerFactory.build()` changes (name, adjustAttributes, quirks)
- [ ] 4. `data/locations/family-home-living-room.js`
- [x] 5. `game-controller.js` + `main-menu.js` wiring (no standalone `GameStart` module — see revised section 5 above)
- [ ] 6. Tests (`player-factory-spec.js`, `game-start-spec.js`)
