---
id: 104
title: Lineage and Meta-Progression
priority: 4
created: 2026-07-09
points: 21
tags:
---
---
Design captured from the "Game Start Event" task (docs/tasks/completed/100-game-start-event.md). None of this is built yet — it's the rogue-lite meta-progression layer that sits above individual characters. The three pieces below are really one system seen from three angles, with a dependency chain: unlocks need accept-death, and accept-death needs the lineage to write into.

### The Lineage (the container)
A lineage is created once, before the very first scenario runs, and *is* the save file. It persists across every character death.

- It has exactly one living character at a time, but retains the progress, decisions, and history of all prior characters.
- Persistent state that lives on the lineage rather than the character:
  - **Home upgrades** — rebuilt/added rooms and workshops, and the crafting characters who move in. A new character starts with whatever a previous run built.
  - **NPC dispositions** — e.g. whether Lief joined your household or set himself up independently carries across the lineage.

Because it's the save-file root and everything else hangs off it, the lineage is architecturally foundational — it likely wants to exist before much else is wired up, even if most fields start empty.

### Accepting Death (the transition mechanic)
The game is an unforgiving crawler: no saving in the dungeon, death is frequent and expected. Accepting death is the rogue-lite hook that *rewards* dying.

- On death you can either reload the save, or accept the death.
- Accepting death marks the current character as permanently dead, then starts a new game with any newly-unlocked scenario (possibly the same one if you made no progress), continuing in the same lineage.

### Unlocking Scenarios (the payoff)
The first run is deliberately the least interesting option: human male, "the lonely shepherd." Progress gates new scenarios — different options at character creation — behind the accept-death mechanic.

- Explicitly gated examples: playing as a woman, as another species, starting with some magic, or starting with party members / people already living in your house.
- Named next step — the **second scenario**: after accepting the first character's death, you can play as that character's younger brother or sister. Similar creation flow, slightly different options, and an expanded set of aspects.

### Open questions / follow-ups
- How the lineage is represented and serialized (it replaces the character as the save-file root).
- What exactly transfers to a new character on accept-death (home upgrades, NPC state, unlocked scenarios) and how it's applied at character creation.
- How unlocks are tracked and which conditions unlock which scenarios.

---
**Notes (Claude):** Foundational rogue-lite layer, none of it built, with a dependency chain (unlocks need accept-death; accept-death needs the lineage to write into). Recommend splitting into: (a) the lineage container + serialization — it *replaces* the character as the save-file root, so it likely wants to exist early even if mostly empty (home upgrades, NPC dispositions); (b) the accept-death transition (mark the character dead, start a new run in the same lineage); (c) scenario-unlock tracking and applying unlocks at character creation. This deserves a proper design pass before estimating the splits. Related: [[project_game_start_event_task100]], and the home-upgrade layer needed by [[116-capture-monsters]].
