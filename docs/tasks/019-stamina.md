---
id: 019
title: Stamina
priority: 3
created: 2026-07-03
points: 3
tags: [training]
---
---
We probably need to do something when a partner's stamina gets low. Once it's in a 'low' zone, the stamina should start effecting both the consent and sensation results.

---
**Notes (Claude):** Add a low-stamina factor. Consent already composes factors (`consent-result.js`) and sensation is modular (`SensationResult.build`), so this is a bounded addition: define the low zone (off `HealthComponent.currentStamina` vs max) and apply penalties in both. Overlaps the health/stamina factor called out in [[035-update-consent-calculations]] — do them consistently.
