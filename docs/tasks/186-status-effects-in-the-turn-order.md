---
id: 186
title: Put status effects in the turn order
priority: 1
created: 2026-08-15
tags:
  - battle
points: 8
---
---
Status effects that act on their own schedule need entries in the battle turn order. A poison ticks every few seconds whether or not its victim does anything, and a fixed time buff expires on the clock rather than on a turn. Right now neither happens: `StatusEffectSystem` only decrements `turnCount` effects at the start or end of a round, so the poison the slithering yeek applies sits on its victim doing nothing at all for the rest of the battle. This is the TODO at the top of `battle-system.js`.

The `BattleState` turn order already models this. `setTurnOrder()` takes `{ time, type:'status', id, code }` and `buildKey()` already keys status entries by their effect code, so the queue can hold them today. Nothing schedules them and nothing processes them.

### What's already in place
- The status effect component carries `interval` and `damage` (a `{x,d,p}` dice roll), and `StatusEffects.renew()` keeps the stronger of two applications.
- `BattleDamageSystem` applies elemental damage, reduced by the target's innate resistance. A nature tick no longer throws.
- `venomous-bite` records both a poison strength and its damage dice when the venom takes hold.

### Steps

**1. The tick machinery.** Add `removeStatusEffectsFromTurnOrder(id)` to `BattleState` and call it from `BattleDeathSystem.killEntity()` and `knockOutEntity()`, which currently remove only the combatant's own entry and would otherwise leave a poison ticking on a corpse. Dispatch `type:'status'` entries in `advanceBattle()` to a new `StatusEffectSystem.processTick()` that rolls the effect's damage dice, applies the damage as the effect type's damage type, adds a message, and reschedules the entry one interval later. Nothing schedules an entry yet, so the battle loop is unchanged in practice and the new path is driven by specs that push an entry into the turn order directly.

**2. Switch it on.** Give the poison record a default `interval`, read by the system with the component's own `interval` overriding it, and have `BattleSystem.addStatus()` schedule an entry for any effect that has one. `removeStatus()` clears it. At this point the yeek's venom starts hurting people.

**3. Resist the effect on a tick.** An `untilResisted` effect gets a `ResistRoll` against its own strength each time it triggers, and passing it ends the effect. This is what stops poison from lasting the whole battle: currently the only roll is the one that applied it. Both `poison` and the `psychic` effects (`delirium`, `enthrall`) use this duration type.

**4. Fixed time removal.** The other half of the original TODO. A `fixedTime` effect schedules a removal entry at the time it expires, rather than triggering periodically.

### Notes
- **A tick isn't a round.** `finishRound()` calls `state.updateTime()`, which reduces the acting entity's ability cooldowns and validates that the round consumed action time. Neither should happen because someone got poisoned, so the tick has to reschedule its own entry rather than reuse that path.
- **The interrupt check has to move.** `advanceBattle()` builds a round before checking for victory or game over. A status entry has to be dispatched before a round exists, so the interrupt check moves to the top of the function - otherwise a poison could tick after the last monster is already dead.
- **The tick still needs a `BattleRound`.** Not to run a round, but because that's what holds the weaver context for the message and what `BattleInterface.showMonsterResult()` reads its messages from. The alternative is a separate message path for events that have no actor, which is cleaner but means new view plumbing.
