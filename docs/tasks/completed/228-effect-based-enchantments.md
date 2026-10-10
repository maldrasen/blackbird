---
id: 228
title: Effect based enchantments
priority: 2
created: 2026-09-18
tags: []
points: 3
---
---
The game needs more randomly generated enchantments before we can fully finish the equipment appraiser. The vulnerable enchantment type is an example of what could be possible for a complex enchantment, but I think most would be rather simple; a sword with a flat damage bonus or a shield with a higher absorption. Even a dagger with a poison effect is still a simple enchantment. These would be defined in the same way the articles are, an array of effects, with whatever options an effect uses, such as strength and damage. These would be priced in kind of the same way the article prices these effects, though a persistent effect is much more valuable than a single use effect, but the scale depends on the effect type I think. A weapon with an effect that sometimes gives a stun effect should have a much bigger value than one that's a plain damage bonus. So we'll probably need it's own function rather than reusing the one from article, or a plain enchantmentCost multiplier.

For now though, this task can concentrate on generating these random effect based enchantments, randomly adding them in the factory, and we can worry about determining their cost later. (Though there's no reason we couldn't start working on the enchantment cost as part of the records...)

---
### Resistance To Status Effect
Resistance to certain status effects sounds like a good place to start. It's an easy effect to implement. A bit boring, but that's fine. I had considered making this an immune effect, but we do still need to take material potency into account, so these enchantments do need a strength that can be scaled. So a percent chance to resist seems logical. An enchantment with 50% resist can still become 150% resistance with a good enough material. (Resistance to status effect shouldn't be capped like damage is. We could have other effects that reduce status effect resistance. So if you have a resist status effect at 150% against something that removes 100% of a person's resistance, you're still left with 50% resistance? It's something to consider. Even if we don't do anything with this, there's no mechanical difference if we leave it uncapped)

### Resistance To Magic Damage
Magic damage resistance from all gear is all added together. So a person with 15% fire resistance on each piece would cap out at 75% fire resistance. There are a lot more magic damage types however, so stacking resistances would provide a lot of protection against one type, but leave you vulnerable against everything else. I think a normal piece of magic resistance gear could have 10% to one type. As items increase in value they get more types or more resistance, though I don't think anything should give more than a 30% magic resistance. 

We also need to take the material into account as well. The strength of an enchantment is multiplied by material potency, so iron gloves with 30 fire resist is scaled down to 15 fire resist, while silk gloves with 30 fire resist is scaled up to 54 resist. We'll eventually add better materials with higher potency like Dryder silk, so if there are materials with a potency of around 3.0, then the actual enchantment cap needs to be 25%, which would cap out resistance with a single piece. 

> We could look into increasing the caps to 90%. 75% was chosen a bit arbitrarily. From a scaling perspective though, when the resistance cap is that high, monsters will need to scale to match. If we want an end game monster to do about 100 damage in a single hit, then its damage would need to be around 1000 per hit. If a player tries to fight it without capped resistances though, the difference between 80% resist and 90% resist could be fairly deadly. If the monsters were scaled to assume a 75% cap, doing 400 damage a hit, then only having 65% resist isn't as bad.

