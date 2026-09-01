---
id: 196
title: Breast size comparasons should use absolute sizes
priority: 1
created: 2026-08-22
tags:
  - character
  - weaver
points: 5
---
---
The `withComparison()` function in the breast loom is using relative rather than absolute sizes. This is a problem because we could describe a vermen with huge tits as having watermelon sized tits, when they're really not even close to that large. This is actually kind of a harder problem than it first seems. The BreastComparisons data is divided into bands because I first wanted to key off of the breast shape, so that long narrow breasts aren't compared to something spherical. In practice though, there just aren't enough common oblong objects for some of these bands to work. I think we need to rework this data object completely. Comparisons like `{appleSizedBreasts}` should just not work for incompatible shapes, and should be guarded by a `shapeComparableBreasts()` predicate when these phrases are used.

