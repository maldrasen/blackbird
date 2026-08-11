---
id: 176
title: Implement potency item effect
priority: 3
created: 2026-08-11
tags:
  - character
points: 8
---
---
"Potency" is a general "increase cock size" size effect. It has a chance to increase cock length, width, testicle width, cum volume, etc. I'll need to look at the cock factory again to consult how cocks are built. I don't want to accidentally keep increasing length or width while ignoring the other, or increase length without increasing flaccid length. When we increase overall size we should try to maintain the same size ratios, though they are allowed to drift. "Short and stubby" shouldn't translate to "long and ridiculously wide". We need to consider the size thresholds as well, deciding when to increase the size category when length grows too large. This is complicated enough that it will need a dedicated CockMutator, though that chain starts as a consumable effect. 

### Follow on tasks
We'll also eventually need more targeted effects for other changes. A high level "equine" effect could also change shape and increase flare width in addition to normal potency. A "canine" effect to change shape and knot size. 

Tits, Pussy, and all the other body parts will also need similar effects and their own mutator modules.