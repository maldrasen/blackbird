---
name: project_equipment_preferences_task237
description: "Task 237 equipment preferences SHIPPED 2026-10-10 - ItemStyle tags on base equipment + materials, EquipmentTaste module, equipper scores armor by taste; bare rule and gender table decisions"
metadata:
  node_type: memory
  type: project
  originSessionId: 8078314a-cb3f-4413-9949-e6bb08878cef
  modified: 2026-10-10T21:03:53.874Z
---

Task 237 (equipment preferences) shipped 2026-10-10 on branch `237-gender-and-preferences-in-equipper`.

- Items carry `tags` (ItemStyle) stored on the item component: base record tags ∪ primary material tags, set by EquipmentFactory. Old saves lack the property; `Item.getTags()` reads missing as [].
- `EquipmentTaste(characterId)` in application/items: `getPreference(itemId)` = sum of archetype weights + gender table (male feminine -80, female masculine -40). `acceptsBare(slot)` true for head/hands/feet, for chest/legs only when archetype slutty weight > 0.
- Equipper `selectArmor`: score = value + slotBudget × preference/100, random within 80% of best positive score, else bare unless !acceptsBare (then least-hated). Weapons untouched.
- `ItemFixtures.stockArmor(depotCode, pieces)` fills a depot's armor stock with known pieces (cycled to stock size) so equipper specs don't depend on random stock.

**Why:** User chose additive budget-scaled scoring and the "slutty > 0 goes bare" proxy over per-archetype flags; nobody in the data hates formidable while disliking skin, so specs use prude+corsets and slut+hauberks.

**How to apply:** The future "refuse to wear this" task should go through EquipmentTaste rather than re-deriving weights. Related: [[project_equipment_depots_task225]], [[project_monster_equipment_task141]].
