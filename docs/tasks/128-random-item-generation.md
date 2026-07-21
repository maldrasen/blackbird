---
id: 128
title: Random weapon and armor generation
priority: 3
created: 2026-07-20
tags: []
points: 8
---
---
The item factories only build bare base items right now. `WeaponFactory.build(code)` and `ArmorFactory.build(code)` take a base record and produce a plain item with no enchantments, so every item in the game is effectively common. We need an ARPG style generation pass that rolls the interesting items, a bit like how Diablo or PoE generate loot:

- A rarity model with a few tiers (common, magic, rare, or whatever the final names end up being). Rarity is decided when the item is built and stored on the item, probably on the `ItemComponent`.
- Each tier rolls a number of enchantments appropriate to its rarity. The enchantment power side is already in place from the material work in task 102: material `potential` feeds enchantment power, so generation mostly needs to pick which enchantments a base item can carry and how many to roll.
- Some notion of an item budget or level so dungeon depth can influence what drops. The enlighten view (task 117) will be the main consumer of this when monsters drop loot, and the CharacterEquipper could use it to give higher budget characters better than base gear.
- Top tier items should be able to roll a proper name. The `nameType` field on the `WeaponComponent` already anticipates this, common vs proper, but nothing generates proper names yet.

**Follow-up (so we don't need a second task):** after this lands, close out the two TODOs in
`application/views/character/inventory-panel.js`:

- Color item names by rarity in `buildItemElement()`, WoW/PoE style. `InventoryManager.listItems()` needs to return the rarity, then it's a CSS class per tier.
- Fix the name phrasing in `updateTradeTitle()` and `dropSelected()`. Common names need an article ("the maul") while proper names don't ("Kobold Fucker"). The TODO suggests a `getName('the')` prefix form on `Item`/`Weapon`/`Armor`, and the weaver's name loom should use the same logic instead of duplicating it.
