---
id: 031
title: Tails and Horns
priority: 4
created: 2026-07-03
points: 3
tags: [character]
---
---
I'm going to build the body with tails and horns as simple string types at first. I think this will work in most cases. It's usually enough to simply state that a character has a dog tail for instance. Eventually I'll want to include things like tail cocks, which will need a more complex tail component that has a child cock component. The same could be said for some kind of unicorn horn type cock. Dicks everywhere! We can do this by setting the type to `_component`, then we would know that the details can be found in a Tail or Horn component. Not just dicks, but something like horn length or color might be important.

---
**Notes (Claude):** Score is for the simple version you describe first — tails/horns as string types on the body component. The component-backed version (tail-cocks, horn-cocks via `type: '_component'` pointing at a Tail/Horn component with a child cock) is a real but separate future task; note it explicitly rather than scoping it in here. The component version overlaps the body-part-type work in [[043-additional-sex-actions-body-part-types]].
