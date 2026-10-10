---
name: status-effect-component-task177
description: Task 177 phase 1 SHIPPED 2026-08-13 — status effects moved from BattleState map to registry StatusEffectComponent
metadata: 
  node_type: memory
  type: project
  originSessionId: f7525198-a69e-4c44-8d77-5a3de9b3e8d8
  modified: 2026-08-13T19:02:28.468Z
---

Task 177 phase 1 shipped 2026-08-13 on branch `177-status-effect-component`: battle status effects converted from the ephemeral `statusEffects = {}` map on BattleState to the registry-backed StatusEffectComponent. `BattleStatusEffect` model deleted.

Key facts for follow-on work:
- Component properties: `_parentId, code, count, interval, duration, strength`. `count` = turns/triggers remaining (turnCount), `interval` = ms between periodic ticks (stored, unread), `duration` = total ms (fixedTime, stored, unread). Numerics nullable, min 1, validated against `StatusEffect.getAllCodes()`, one component per (parent, code).
- `apply(parent, code, values)` renews per-property larger-non-null-wins and returns `{id, removed}` (removed = opposition codes deleted — poised/off-balance hard-coded pair). `destroy` uses `Registry.deleteEntity` (never `deleteComponent` — orphan entities).
- StatusEffect records: `clearAfterBattle: true` on the 19 battle-only effects; paralysis/infestation omit it (default false). Accessor is `isClearedAfterBattle()` (see [[boolean-accessor-naming]]). Toxic/Withering codes fixed to lowercase.
- `StatusEffectComponent.removeBattleEffects()` runs in `BattleSystem.reset()` — the single teardown choke point for won/lost.
- BattleState keeps `addStatus(entity, code, values)` / `removeStatus` / `getStatusEffects` (now returns an array) / `hasStatusEffect` as thin delegates adding `BattleInterface.updateCombatantView`.

Deferred (phase 2+): fixedTime/interval expiry via turn order (TODO comment above `addStatus` in battle-state.js), `ConsumableEffect.addStatusEffect` stub → `StatusEffectComponent.apply`, game-time expiry for persistent effects (no scheduler exists; sweep after `advanceGameTime` in navigation systems), strength effects, data-driven opposition, vulnerable stack consumption, negotiation DSL still uses `duration` key mapped to `count`.
