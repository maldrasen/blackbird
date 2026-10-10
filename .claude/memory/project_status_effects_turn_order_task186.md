---
name: project-status-effects-turn-order-task186
description: "Task 186 shipped status effect ticks/expiry in the battle turn order; renewal must NOT reschedule pending ticks (starvation bug), damage-before-resist ordering chosen by user"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e2b8f8b-31d5-4736-a364-48bd8a5ac115
  modified: 2026-08-16T19:51:13.612Z
---

Task 186 (shipped 2026-08-16) put status effects into the battle turn order, completing the fixedTime/interval work deferred from [[project-status-effect-component-task177]].

- `advanceBattle()` checks the interrupt first, then peeks `getNext()`; `type:'status'` entries route to `statusEffectRound()` which builds a bare `BattleRound(victim)` (no finishRound/updateTime/cooldowns) and calls `StatusEffectSystem.processTick()`.
- Invariant: turn order entries are peeked, never popped — every `processTick()` path must reschedule the entry or see it removed, else it dispatches forever.
- **Renewal starvation bug (user-found in play):** `scheduleTick()` on every `addStatus()` re-upserted the entry to now+interval; venomous-bite's cooldown matched poison's interval so the tick was pushed out forever. Fix: renewal keeps the pending tick (`hasTurnOrderEntry` guard). Exception: fixedTime removal entries DO reschedule on renewal — extending a timed effect is the point.
- User-chosen tick order: damage first, then `isDown` bail, then resist roll (poison always hurts on the round it triggers; a downed victim never rolls).
- Death/KO/flee sweep entries via `BattleState.removeStatusEffectsFromTurnOrder(id, code=null)` (non-throwing, unlike `removeFromTurnOrder`).
- Deferred: burn is fixedTime + damage dice so it only expires, never ticks (spawned follow-up task); delirium/enthrall have no intervals yet (nothing applies them with strength).
- Spec gotcha: every surviving-victim tick ends in a ResistRoll — specs must stub it (`failResist()` helper) or they consume live rolls and flake.
