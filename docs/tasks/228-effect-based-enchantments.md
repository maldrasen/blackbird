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

For now though, this task can concentrate on generating these random effect based enchantments, randomly adding them in the factory, and we can worry about determining their cost later.