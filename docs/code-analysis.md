### 4.3 Persistent sensitivity levels never multiply sensations
The same doc says the (persistent) sensitivity scales are used as multipliers — level 0 means no pleasure
from that part, letters map to factors 0.25-16. In code, `SensitivitiesComponent` values are only used as
binary erogenous gates (`> 0`) in `SensationResult`, and `SensationScales` applies the letter factors to the
*transient session scales* instead (which start at F every session). If that's a deliberate redesign, update
the doc; if not, there's a missing `SensationSensitivities` step — and it's a big balance lever to be missing.

