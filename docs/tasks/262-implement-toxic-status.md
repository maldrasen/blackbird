---
id: 262
title: Implement toxic status
priority: 2
created: 2026-10-09
tags: []
points: 3
---
---
We need to implement the toxic status effect and add an enchantment that adds toxic buildup. Every time toxic is applied it adds a toxic stack. When adding a stack, we'll need to roll the damage for that stack, adding it to an accumulator that's stored in the component with the stack count. Once 10 stacks have been applied it does all the accumulated damage at once. The toxic status should be removed after combat, and stacks should be curable in some way, though the cure could be done as a later task. Perhaps with a spell or consumable.

> 10 stacks may be too many? Perhaps some toxic enchantments apply more stacks at once or maybe reduce it down to 6 or so.