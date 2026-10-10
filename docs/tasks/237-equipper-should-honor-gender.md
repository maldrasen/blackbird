---
id: 237
title: The Character Equipper Should Honor Gender and Sexual Preferences
priority: 2
created: 2026-09-26
tags:
  - character
points: 3
---
---
We've added corsets to the list of armor, because we needed some lewd armor variants. Equipment like corsets won't be gender locked (anyone can equip them) but a male character would rather not pick one when equipping themselves. Though they don't exist yet, when we add accessories, some of them will need to be body part locked. For armor and clothing I think we can get away with just giving them a gender preference. 

We need to take a character's personality and sexual preferences into account when shopping for equipment as well. A prude character should avoid lewd armors (though still would prefer them over being naked). A slut character though would prefer something lewd. We could even score some equipment with varying levels of degrading or masochistic. 

The equipArmor() function is fairly simple right now. They'll pick whatever armor has the highest value within their budget. We'll need to extend this by adding a scoring step, where each armor piece is balanced by how well it works against how willing they are to wear it. This will become more important as more exotic and unusual armors and outfits are added.

I don't think any of this applies to weapons though. 

> The Archetypes already have an outfitStyles property, though I don't think I've used it anywhere yet. One possible implementation of this is we can change the outfit styles to a map of tag weights, and give equipment tags.

> We're able to tag some base equipment based on the shape and coverage of that equipment. All hauberks are formidable. Other tags will depend on the primary material. Something made of silk is lavish. Something made of leather is natural. The equipment builder will need to add tags as items are built.

> There's another step here that will only come when we start adding item descriptions. If an item is black or decorated with skulls it becomes morbid. We don't know any of that though until we do the step that adds such details to the items.