---
name: project_fixture_boundary
description: "Start fixtures (Fixtures.setupBattle/Dungeon/Training behind the main-menu buttons) are the user's unstable feature playground; specs must not depend on their composition"
metadata:
  node_type: memory
  type: project
  originSessionId: 3462389a-7b76-476b-a542-15933bf53a40
  modified: 2026-10-13T20:26:08.115Z
---

The main menu's "start fixture" buttons call `Fixtures.setupBattle/setupDungeon/setupTraining` in `application/fixtures/`. The user changes these freely while working on a feature (task 014 swapped the P.1.2 rogue for an archer on 2026-10-13), so their party composition is not stable.

Task 267 (shipped 2026-10-13) drew a hard wall: specs use only the `test-support/` globals (`BattleSupport`, `CharacterSupport`, `ItemSupport`, `TrainingSupport`, `Tests`), which the runner requires from the manifest's `supportFiles` before the root hooks are registered. `BattleSupport.startBattle(encounter=runtPack())` builds the stable spec party (player P.0.2 sword+shield, tank P.0.3, dagger rogues P.1.2 and P.1.3, a replica of the pre-archer fixture) and returns the battle state; `prepareParty()`, `startCharacterRound()`, `grantMana()`, `trapperPack()` ride along. `application/fixtures/` keeps only what the menu uses (`BattleFixtures.prepareForBattle/grantMana`, `CharacterFixtures.randomPlayer/randomCharacters`, `ItemFixtures.build/equip`); the small builder twins are duplicated on purpose. `Tests.running()` is gone: `Environment.viewPresent` is now a plain property (true in the packed client object, false on the Node object headless boots use).

**Why:** Fixture edits for a feature broke 7 unrelated specs that assumed "P.1.2 is a dagger rogue". A grep-enforceable rule (no `Fixtures` under test/ or test-support/) keeps it from recurring.

**How to apply:** New spec setup helpers go in `test-support/`, never in `application/fixtures/`, and test-support must not call `*Fixtures`. Prefer role-named lookups over hard-coded positions in new battle specs. Simplifying the spec party (dropping enchantments/armor, fixed skills) was left as an optional follow-up. See [[feedback_spec_style]].
