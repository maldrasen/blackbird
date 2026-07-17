---
id: 024
title: Character Weakness
priority: 3
created: 2026-07-03
points: 5
tags: [training]
---
---
We can add a sensation result factor that adds bonus pleasure to a character's weakness. A weakness could be their most sensitive part, when sensitivity is at least a B. There could also be an action type requirement there as well, like thrusting or sucking potentially. Actions that hit the weakness generate slightly more sensation, maybe 25% more or so, and should increase comfort as well. Unless this is a pain causing action, then we get increased pain. A masochist can potentially have a weakness to a certain BDSM type too of course. Something to consider.

---
**Notes (Claude):** A new sensation module (mirrors the existing ones under `training/sensation-results/`, registered in `SensationResult.build`) granting ~+25% sensation and comfort when an action hits the character's most-sensitive part (sensitivity ≥ B via `letter-grade-helper`), possibly gated by action type (thrust/suck). Pain-causing actions invert to extra pain; the BDSM-type weakness for masochists is a stretch. Bounded and self-contained.
