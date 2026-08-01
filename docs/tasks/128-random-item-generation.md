---
id: 128
title: Random weapon and armor generation
priority: 3
created: 2026-07-20
tags: []
points: 8
---
---
We've updated the monsters to have real equipment components built when the monsters are built. We needed to do this for a couple of reasons, first to simplify the weapon looms and requirements. Rather than having to look in two places for weapon data, we can always look at the equipment and item components. Also, when a monster joins the party, they now come with whatever equipment they were using.
### Loot
These items could also be passed to the enlighten system as the dropped loot, though I'm not sure yet if I want all monsters to drop all their equipment. While this makes logical sense, I've played enough Bethesda games to know that this kind of mechanic turns me into the dungeon janitor, picking up every scrap I can find. We would also either have to add an encumbrance system, or simply allow people to carry 500 bone spears around. As a player, I really hate having to deal with encumbrance, and having a small inventory just feels bad. I feel like it's better for loot to be rare but valuable, which is more of the Wizardry style.

That said though, I also don't want a system where a monster's loot table is completely divorced from their equipment. I feel like it's also bad when you're fighting a bear in World of Warcraft and that bear drops a battle axe. I think a hybrid of the two would be better, a system where a monster is randomly generated with rare equipment. The rare equipment would drop as loot, but the common equipment is just ignored, deleted after the battle. If we need an in world justification for this, we can assume that common weapons and armor from the dungeon are just so common that the shops in town just won't buy them. There's an infinite supply and barely any demand. Rare items though, things that have been enchanted or are just of rare quality, are worth picking up and shop keepers will buy them.

First though, we need to be able to generate these rare items.

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
