---
id: 036
title: Update Sensation Calculations
priority: 3
created: 2026-07-03
points: 8
tags: [training]
---
---
A few things had to be put on hold in the sensation calculations as well. There's a lot I still need to do with most of the sexual preferences. I've only implemented the simple partner physical sensations so far. I feel like the others are going to need a bit more infrastructure in place first. Like I need to have gaping logic in place before the gape queen preferences can trigger. I'm also not really sure what effect preferences like 'dominant' would really have, especially for dominant partners, being forced into submission. 
- Apply the training scales to the sensations.
- Determine how player sexual preferences are set. (Directly on the action? Reflection of the partner's preferences)

There are probably a bunch of other random shit that will need to go into the sensation results. Body piercings, magic, and drugs could all effect part sensitivities, and there will probably be some aspects that will change the way sensations are produced.

---
**Notes (Claude):** Finish sensation building — apply training scales to sensations (there's a `SensationScales` module to flesh out), decide how player preferences are set (on the action vs reflected from the partner), and add sensitivity modifiers from piercings/magic/drugs/aspects. Several sub-pieces are gated on systems that don't exist yet (gaping for the gape-queen preference, [[032-body-piercings]], [[030-drugs]]), so expect to land this incrementally as those arrive rather than all at once.
