---
name: guard-style
description: "Wrap a short body in a plain if rather than guarding it with an early return; check presence with Validate.exists()"
metadata:
  type: feedback
---

When a function's whole body is conditional on one check, write `if (thing) { ... }` around the body rather than `if (thing == null) { return; }` followed by the body. Presence checks in record validators go through `Validate.exists(name, value)` instead of a hand-written null check and throw.

**Why:** The user rewrote both forms on task 229 (2026-10-24): an early-return guard in the reference validator and in processHit became plain ifs, and a null check with a throw in the Ammunition record became `Validate.exists`. Early returns are for escaping a chain of cases ([[avoid-else-if-chains]]), not for a single guard over a few lines.

**How to apply:** Reach for the early return when it replaces an if/else-if chain or there are several bail-out conditions. For one condition around a short body, nest it. See [[use-existing-helpers]] for the Validate module.
