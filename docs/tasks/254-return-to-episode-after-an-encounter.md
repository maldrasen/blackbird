---
id: 254
title: Return to episode after an encounter
priority: 2
created: 2026-10-01
tags:
  - episode
  - battle
points: 3
---
---
When a battle is started from an episode we need a way to specify what should happen after the battle is resolved. A battle can be started from an episode button with:
```
startEncounter: { record, ambushState }
```

Bunnyway, a battle started this way should return to the dungeon if it was started from the dungeon, or the location if started from the location. What's missing is a way to go back into an episode after the battle. Rather than trying to return to some point in the instigating episode we can start a follow on episode with:
```
startEncounter: { record, ambushState, afterBattle:{ episode:code }}
```

Currently we're throwing the current episode state away when the battle starts and the follow on episode would have an empty state object. I think that's fine. Most follow on episodes shouldn't need to know anything from the previous episode, and if it's super important that it does we can just set a global flag for it.

The [208] Six Blade Knife chain needs this. The kobolds fight a group of vermen, and if you side with them, an after battle page is where they introduce themselves and the party earns their respect. Most person encounters that can turn violent will want the same thing.

---
### Implementation Notes
- **The return mode gets used up before a follow-on episode could start.** Finishing the enlighten view calls `GameSystem.returnToPreviousMode()`, which sets `returnMode` to null. If the follow-on episode started after that, its own ending would call `returnToPreviousMode()` with nothing marked, leading to `setGameMode(null)`. The follow-on episode has to start *instead of* that return, so the return mode marked when the original episode began is still there when the follow-on episode ends.
- **`BattleState` already has an `afterBattle` value** (default `'dungeon'`) that nothing reads. The new option can be passed straight through into it. Its default should become "no follow-on episode" rather than `'dungeon'`.
- **Which endings start the follow-on episode.** A lost battle still goes to the game over episode. Battles can also end through negotiation, with the monsters running or joining the party. Wins all go through the `victory` interrupt, so check whether a negotiation ending also resolves that way and starts the follow-on episode.
- **Validation.** The episode validator should accept the new option, and the reference validator should check that the `afterBattle` episode code exists.
