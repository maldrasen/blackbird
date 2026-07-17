---
id: 032
title: Body piercings
priority: 4
created: 2026-07-03
points: 8
tags: [character]
---
---
The various body components either have associated components or have the body piercing data on the component itself. It kind of makes sense to just have piercing information as properties of the component. The breast component could have a simple piercingType property. However, depending on how deep I want to go here, a piercing component could be a child of another component. The breasts could have several piercings at once, nipple bars and areola rings at the same time. Each piercing could have a material. They could even carry enchantments so they would also count as equipment. And if that's the case then we'd need to see about equipping and unequipping various body piercings as a type of jewelry. Definitely more of a long term goal.

---
**Notes (Claude):** Scope is the whole story — decide the tier before starting. Cheap version: a `piercingType` property on body components (~2). Full version (what pushes this to 8): piercing as a child component supporting multiple per part, each with a material ([[project_equipment_material_model]]) and optional enchantment, making them equippable/unequippable jewelry (`equipment-manager`/`character-equipper`) that also affects sensitivity in [[036-update-sensation-calculations]]. Pick a tier explicitly rather than sliding into the full version.
