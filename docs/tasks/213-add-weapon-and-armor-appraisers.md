---
id: 213
title: Add Weapon and Armor Appraisers
priority: 1
created: 2026-09-03
tags:
points: 8
---
---
The value of weapons and armor come entirely from the base record, which only looks at the materials used to create that item. That's not going to work once a weapon has enchantments and such. Weapons and armor should have an appraisal step which can be run after the components have been built.

As part of this though, I think the weapons and armor is due for a major revision. We'll be moving much of what the records are doing into the components, where I think it belongs. I'm going to get rid of variants, moving weapons and armor built from different materials into the factories.

The revision itself is now task 226, which unifies the weapon and armor records, factories, components, and wrappers into a single equipment model. This task depends on it. Once 226 lands, this task is a single `EquipmentAppraiser` that runs at the end of `EquipmentFactory.build()` and writes a `value` onto the item component. Its value branches follow the record: a damage-per-second performance factor for weapons, a total-reduction factor for armor, and the doubled reduction factor for shields, each multiplied by the material cost plus effort. The commented-out `getValue` and `getPerformanceFactor` sketches in the current weapon and armor appraiser stubs are the starting point.