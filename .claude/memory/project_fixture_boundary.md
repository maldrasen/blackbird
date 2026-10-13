---
name: project_fixture_boundary
description: "Start fixtures (Fixtures.setupBattle/Dungeon/Training behind the main-menu buttons) are the user's unstable feature playground; specs must not depend on their composition"
metadata:
  node_type: memory
  type: project
  originSessionId: 3462389a-7b76-476b-a542-15933bf53a40
  modified: 2026-10-13T20:26:08.115Z
---

The main menu's "start fixture" buttons call `Fixtures.setupBattle/setupDungeon/setupTraining` in application/test/fixtures.js. The user changes these freely while working on a feature (e.g. task 014 swapped the P.1.2 rogue for an archer on 2026-10-13), so their party composition is not stable. Specs must not be coupled to it. As of 2026-10-13 both the UI entry and 41 spec files still share `BattleFixtures.prepareForBattle()`; a decoupling plan was proposed (stable spec party vs. UI-composed party from the same builders).

**Why:** Fixture edits for a feature broke 7 unrelated specs that assumed "P.1.2 is a dagger rogue".

**How to apply:** When a fixture change breaks specs, fix by giving specs their own stable setup, not by pinning the UI fixture. Prefer role-named lookups over hard-coded positions in new battle specs. See [[feedback_spec_style]].
