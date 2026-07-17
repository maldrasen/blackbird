---
id: 003
title: Training Systems
priority: 2
created: 2026-07-03
tags: [training]
points: 5
---
---
How a persisted action is performed can be adjusted slightly between rounds. A player should be able to adjust their thrusting speed or strength, values that should be applied to fingering, fucking, fisting; anything action that's insertion focused.

---
**Notes (Claude):** A per-round adjustment on an already-persisted action, so the state lives on the `PersistedAction` (`application/training/persisted-action.js`), not the immutable `SexAction` record. Add a small set of tunable params (speed/strength) with defaults, a way to flag which actions accept them (insertion-focused actions — probably a `thrustable: true` on the action data or keyed off `BaseClass.penetration`), UI controls in the persisted-actions panel (`application/views/training/training-persisted-actions-panel.js`), and feed the values into `SensationResult.build` (likely a new sensation module or into `SensationTechnique`). Bounded and self-contained. Related: [[022-orifice-ready-state]] (resuming thrust state), [[036]] sensation work.

