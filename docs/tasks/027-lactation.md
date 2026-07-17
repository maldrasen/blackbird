---
id: 027
title: Lactation
priority: 3
created: 2026-07-03
points: 5
tags: [training]
---
---
We set the breast's lactationFactor to 0 when we create a character. The `milky` trigger can then set lactation to a value between 90 and 100. We don't have any other systems that actually use this property though.

---
**Notes (Claude):** `lactationFactor` is already set on the breast component (0 default, the `milky` trigger raises it to 90–100) but unused. Add the systems that consume it: milk production/volume and milk as a fluid. Best built on top of [[025-sex-fluids]] so milk shares the same fluid model — small on its own once fluids exist, larger if you build the fluid plumbing here.
