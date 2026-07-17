---
id: 035
title: Update Consent Calculations
priority: 3
created: 2026-07-03
points: 8
tags: [training]
---
---
The consent calculations are only about half finished, in a state where it's good enough to move onto other tasks in the training system. I'll need to go back and implement the rest of this.
- Apply personality factors, once they've been reworked.
- Need to also read current scale values, as the current anima and animus values should effect consent.
- A few aspects (like erogenousThroat) might effect consent.
- Health and stamina? Being injured should reduce consent in general. What about stamina?
- Body part fit will also need to be taken into account. We'll need a general, will part fit into part class. Will it fit? Will it hurt? (Do you want it to hurt?) Will it be satisfying? Not big enough? Clearly a more complicated factor.
- Marks. The hate marks and lust marks should definitely effect consent.

---
**Notes (Claude):** Finish `consent-result.js` — several factors, each small except one: personality (post-rework), current anima/animus scale values, a few aspects (erogenousThroat), health/stamina penalties (overlaps [[019-stamina]]), hate/lust marks, and the big one — a general body-part-fit factor (will it fit / hurt / satisfy) that depends on [[023-arousal-adjustments-for-min-and-max-orifice-width]] and the orifice model. Marks must exist first. The factor framework is already in place, so most of these are additive; body-part-fit is where the real work is.
