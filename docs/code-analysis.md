### 4.3 Persistent sensitivity levels never multiply sensations
The same doc says the (persistent) sensitivity scales are used as multipliers — level 0 means no pleasure
from that part, letters map to factors 0.25-16. In code, `SensitivitiesComponent` values are only used as
binary erogenous gates (`> 0`) in `SensationResult`, and `SensationScales` applies the letter factors to the
*transient session scales* instead (which start at F every session). If that's a deliberate redesign, update
the doc; if not, there's a missing `SensationSensitivities` step — and it's a big balance lever to be missing.



`{A:equipped.<slot>}`, `unequip(A,<slot>)`, `setPosition(<position>)`, 




### 4.5 ECVC doc vs `deleteComponent`
`docs/1. Architecture - ECVC.md` says "When a component is removed any child entities … are also removed."
`Registry.deleteComponent()` doesn't touch children; only `deleteEntity()` cascades. Either the doc overstates
or the registry under-delivers — with body-part components as child *entities*, deleting a component probably
should orphan-check.

### 4.6 Baseline repeat-penalty exempts anger
`sensation-baseline.js:45` exempts `anger` from the repeat/persisted strength reduction, while the comment
above (and the doc) say *all* baselines are penalized. Almost certainly intentional (spamming shouldn't
discount anger) — worth one comment line so it doesn't read as a bug.

