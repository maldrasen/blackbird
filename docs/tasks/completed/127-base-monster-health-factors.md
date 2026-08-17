---
id: 127
title: Add a Health factor to the EssenceSystem
priority: 4
created: 2026-07-19
tags: []
points: 2
---
---
In the game, only the recruitable monsters have a species record, but there are going to be other creatures that you can fight and get essence from. Monsters without species will instead have a range of attributes, rather than levels. These monsters will also need a health factor to calculate their current health. Though health is associated with vitality, the monster's size plays a bigger role in the damage you need to do to them. Bigger creatures also have more life, they produce more essence. So we need to also go back to the EssenceSystem and factor the species or monster's health factor into the essence value calculation.

> I think we've already done most of this, but I don't think the health and speed factors aren't taken into account in the essence calculation yet. When we look into this we may want to add a bonusEssence property to monsters as well to fine tune essence awards, giving bonus essence to some monsters (or reducing it in some cases maybe, game lore wise, human opponents shouldn't award essence.)
