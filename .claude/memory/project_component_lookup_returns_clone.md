---
name: project-component-lookup-returns-clone
description: Registry.lookupComponent returns a shallow clone; component mutations must go through update(). Watch for read-back-before-persist bugs.
metadata: 
  node_type: memory
  type: project
  originSessionId: d155ca28-26c2-4113-8c5b-686bfe2bdf46
---

As of 2026-07-08, `Registry.lookupComponent(id, type)` (`application/world/registry.js`) returns a **shallow clone** (`{...stored}`), not the live stored object. A missing component still returns `undefined` (guarded), so null checks keep working. Every component's `lookup()` wraps this, so all `*Component.lookup()` calls now return clones.

**Consequence / the rule:** you can no longer mutate a looked-up component in place and expect it to persist. All writes must go back through `Component.update(id, data)` (which merges via `Registry.updateComponent`). The `mutate-clone-then-update` pattern is fine and is how most code already worked.

**Why (user's stated rationale, don't revert the clone for convenience):** the whole point is to force every write through `update()` → `validate()`. A silent failure-to-persist is strictly preferable to a component holding invalid data — a dropped update is a traceable "my change didn't stick" bug, whereas bypassing validate lets corrupt state through silently and surface far from the cause. The clone makes `update()` the only door in. The shallow-clone caveat below (nested refs still leak) is an accepted, known limitation — the user considers it a non-problem.

**Two non-obvious bug classes this surfaced (both fixed), watch for more:**
1. **Read-back before persist:** code that mutates a looked-up component, then — *before* calling `update()` — calls a helper that internally re-`lookup()`s the same component expecting to see the in-progress mutation. With clones the helper sees stale persisted state. Fixed: `Character.rollForOrgasm` now takes `pleasure` as a param instead of looking it up (`training-system.js` mutates arousal, rolled for orgasm, then persisted).
2. **Component-internal self-mutation:** a component's own `create`/`update` calls a clamping/normalizing helper that does `lookup(id)` then mutates it. That mutation is now lost. Fixed: `HealthComponent.moderate()` now ends with `Registry.updateComponent(id, ComponentType.health, healthComponent)` to write the clamped values back. Health was the ONLY component with this pattern (only one with a `moderate()`), but if another component gains a moderate-style step, it needs the same write-back.

**Shallow-clone caveat:** nested objects/arrays are still shared by reference (e.g. `InventoryComponent.items`/`articles`, `MonsterComponent.threatTable`). Mutating those nested structures still leaks into stored state even without `update()`. Those sites all call `update()` anyway, but the clone is NOT a deep freeze.

**Other fix rolled in:** `EquipmentManager.equipItem(null, slot)` (unequip) now sets the slot to `null` instead of `delete`-ing the key, because `updateComponent` merges keys and can't persist a deletion. Empty slots are already treated as null everywhere they're read (`character.js` `isNaked`/`isEquipped`, `getSlot`, equipment `validate`).
