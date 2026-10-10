---
name: feedback_spec_style
description: "How to write Mocha/Chai specs in Blackbird - real records, hard-coded expected values, no data-registry pollution"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9d40af19-7519-44a5-bb5d-455fff50495f
---

Two rules for writing specs in Blackbird (Mocha + Chai, run in-app via manifest `testFileList`; dev mode runs them on app start):

1. **Do not register data records in a spec.** The data registries (BaseWeapon, BaseArmor, Material, etc.) have no unregister/reset between specs (unlike the entity Registry). Registering throwaway `spec-*` fixtures permanently pollutes the record set, so they leak into real features (starting equipment, shops iterating `getAllCodes()`). Write assertions against the real shipped records instead.

2. **Hard-code the actual expected values; do not recompute them.** Deriving the expected value in the spec by repeating the formula under test (e.g. `Σ(cost×amount) + effort×_effortCost`, or `low × Material.getFactor(...)`) tests nothing — it just asserts the code equals itself. Put concrete literals in the spec so a reader sees the expected numbers, and so the spec FAILS when the underlying data is tuned. A spec failing on a data change is desirable, not a problem to engineer around.

**Why:** specs should document concrete behavior and act as a tripwire when data/records change; robustness-to-tuning and fixture convenience both undermine that.

**How to apply:** pull real current values from the records (run headless), then paste them as literal expectations keyed to real record codes (`longsword`, `plate`, `fist`, ...). Note that coverage of a branch that no shipped record exercises (e.g. a weapon with a below-1.0 sharpness material — all base weapons are baseline steel/leather/wood) is simply left uncovered rather than faked with a fixture. See [[project_equipment_material_model]].
