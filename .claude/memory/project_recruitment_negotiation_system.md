---
name: project-recruitment-negotiation-system
description: SMT-style negotiation recruit-slice is built; recruiting a monster is the production path that creates a FeelingsComponent and adds it to the new GameState roster
metadata:
  node_type: memory
  type: project
  originSessionId: 54a68003-155f-4f4e-8d4c-e3dd7c58abf9
  modified: 2026-08-06T15:53:31.724Z
---

The SMT-style negotiation **recruit slice** is built (task 002). When one monster remains, a `Negotiate` utility
command appears; choosing it opens a modal overlay over the live battle view (no game-mode switch), the monster asks
3 questions, and the tone of the player's answers scores against the monster's archetype to set the recruited
monster's initial feelings.

**Where things live:**
- `application/battle/negotiation-controller.js` — flow/scoring state machine (mirrors `TargetingController`), accepts when `affection >= fear`.
- `application/views/battle/negotiation-overlay.js` + `views/negotiation-overlay.html` — the modal (own `#negotiationOverlay`, reuses class-based `.overlay` styles).
- `application/battle/systems/recruitment-system.js` — `RecruitmentSystem.recruit(monsterId,{affection,fear,respect,control})`: creates `FeelingsComponent` toward the player, adds `ControlledComponent`, destroys `MonsterComponent`, adds to roster. Headless-tested.
- `GameState` now has a `$roster` (owned characters, distinct from `partyConfiguration`): `getRoster/addToRoster/removeFromRoster/isInRoster`.
- Data model (as of 2026-08-06): `NegotiationReaction` (`application/negotiations/negotiation-reaction.js`) is a
  **builder DSL + model**. Data files call `NegotiationReaction.respect(msg, options)` / `.join()` / `.followUp()` /
  `.contest({skill|attribute|random, win, loss})` etc. inside `NegotiationQuestion.registerReaction(code, data)`.
  Every factory routes through one `buildReaction()` constructor returning a **frozen instance** with canonical shape
  `{type, message, feelings, effects, [question|code]}` plus closure methods: `resolve(context)` (walks contest
  branches to the terminal reaction), `applyEffects(context)` (flags / givePreferences / giveStatusEffect — an
  explicit step `NegotiationSystem.answer()` calls after resolving, no longer implicit in resolution), and
  `withFeelings(feelings)` (immutable copy used by feelings moderation). Unknown option keys throw at build time
  (authoring-typo guard). `NegotiationQuestion.lookup().getReactionData()` returns registered reactions **by
  reference** (no clone), so instances keep their methods. Spec gotcha: shape assertions use `deep.include`, not
  `deep.equal`, because methods are own properties.
- `NegotiationSupertype` enum (fierce/timid/warm/lewd) on each archetype, **nullable**: brat/playful/reserved/serious
  have `supertype: null` and must ship their own unconditional reaction to every question (enforced by
  `NegotiationReaction.validate()`).
- Records validate **post-load**, not at register (alphabetical manifest order breaks cross-record refs at register
  time): `Loader.boot()` → `validateData()` calls each record's `validate()`; record specs call the same `validate()`
  so headless runs are covered.
- Prose: `global.NegotiationScript` in `data/negotiation/standard-negotiation.js` keeps only greeting/accept/refuse/
  declineMessage (woven with `{T:...}`); folding those into a matchable record is a noted follow-up. Recruit reuses
  `BattleInterface.showVictory()`.
- Browser smoke-test recipe (no Fixtures.setupBattle — it needs a location): `BattleFixtures.prepareForBattle()`,
  `BattleSystem.startBattle({afterBattle:'returnTo.mainMenu', encounter:'kobold-tossers'})`,
  `GameSystem.setGameMode(GameMode.battle)`, kill extras via `BattleDeathSystem.killEntity`, force archetype via
  `PersonalityComponent.update`, `BattleSystem.specRound(player)`, then `NegotiationController.start()`.

**How to apply:** This unblocks the old "FeelingsComponent.create only in fixtures" concern — the recruit path is real
now. Deferred (stubs/later): the other negotiation outcomes (sneak-attack, take-bribe-and-flee, training-challenge),
monster-initiated negotiation, and prettier overlay styling. The user will author the **per-archetype negotiation
dialogue themselves** — don't auto-generate archetype text or wire per-archetype `Dialog` packages unless asked; the
generic script + archetype-driven scoring is intentional. See [[project_equipment_material_model]] for the similar
"systems present, content later" MVP pattern.
