---
id: 237
title: Equipment Preferences
priority: 2
created: 2026-09-26
tags:
  - character
points: 3
---
---
We've added corsets to the list of armor, because we needed some lewd armor variants. Equipment like corsets won't be gender locked (anyone can equip them) but a male character would rather not pick one when equipping themselves. Though they don't exist yet, when we add accessories, some of them will need to be body part locked. For armor and clothing I think we can get away with just giving them a gender preference.

We should take a character's personality archetype into account when shopping for equipment. A prude character should avoid lewd armors (though still would prefer them over being naked). A slut character though would prefer something lewd.

The equipArmor() function is fairly simple right now. Characters pick whatever armor has the highest value within their budget. We'll need to extend this by adding a scoring step, where the value of each armor piece is weighed against how much they like it. If a piece of armor has a negative score they won't choose it.

For this step, I think we start with the value as a baseline. Then use their equipment preferences to raise and lower the value. This can't be a simple percent factor because a low enough preference will push the value into the negative, while leaving some disliked items with a low value, but still a valid pick if there's nothing else that's better. This logic will still need some special cases though. A character may hate slutty clothing, but should still pick something over going topless. A slutty character though would prefer being topless over wearing something they hate.

> In the future, we could even tag equipment as degrading or masochistic, though nothing like that currently exists. We need to implement the Accessory items before that can be done though. Something like magical nipple clamps would be masochistic.

> This task is only about wiring up the character equipper to take these tags into account, but another future task would be to enforce these character preferences. Characters could refuse to wear items they don't like. I'm only mentioning that so we know that these style preferences extend beyond the character equipper. "Do I want to wear this?" Needs to be a general function that a character can answer.

> The Archetypes already have an outfitStyles property, though I don't think I've used it anywhere yet. One possible implementation of this is we can change the outfit styles to a map of tag weights, and give equipment tags.

> We're able to tag some base equipment based on the shape and coverage of that equipment. All hauberks are formidable. Other tags will depend on the primary material. Something made of silk is lavish. Something made of leather is natural. The equipment builder will need to add tags as items are built.

> There's another step here that will only come when we start adding item descriptions. If an item is black or decorated with skulls it becomes morbid. We don't know any of that though until we do the step that adds such details to the items.

---
## Implemented
Items carry style tags (`ItemStyle`). A base equipment record lists the tags its shape earns (hauberks and plate are formidable, corsets are slutty and feminine), and the equipment factory adds the tags of the item's primary material when it's built: silk and silver are lavish, leather and wood are natural, bone, flint, and stone are barbaric. Wool, iron, and steel say nothing. The tags are stored on the item component, so a future item description pass can add its own (black and skulls would be morbid).

`EquipmentTaste(characterId)` answers how much a character wants to wear an item. `getPreference(itemId)` sums the archetype's weight for each of the item's tags, plus a fixed gender table: males weigh feminine at -80, females weigh masculine at -40, futa and none weigh nothing. `acceptsBare(slot)` is always true for the head, hands, and feet. For the chest and legs it's only true when the archetype's slutty weight is above zero, on the grounds that being bare there is itself slutty.

The equipper scores each affordable piece of armor as `value + slotBudget × preference / 100`, so a +100 preference is worth one slot budget and a strong dislike pushes a cheap piece negative no matter how rich the shopper is. The pick is random among the pieces within 80% of the best positive score, which for a character with no opinion is the same as shopping by value. When nothing scores above zero the slot stays empty, unless the character doesn't accept being bare there, in which case they take the least hated piece. Weapons and shields are still picked by value alone.

A character can't yet refuse to wear something they're handed. That should go through `EquipmentTaste` when it's added.
