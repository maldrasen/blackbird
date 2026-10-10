---
name: boolean-accessor-naming
description: "Boolean accessors on records/models are named is*/has*, not get*"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f7525198-a69e-4c44-8d77-5a3de9b3e8d8
  modified: 2026-08-13T18:35:43.678Z
---

The user renamed `getClearAfterBattle()` to `isClearedAfterBattle()` on the StatusEffect record (2026-08-13, task 177).

**Why:** Boolean accessors read better as predicates; `get*` is reserved for value getters.

**How to apply:** When adding an accessor that returns a boolean to a record or frozen model, name it `isX()`/`hasX()` (e.g. `isClearedAfterBattle`, `hasParent`), even when the underlying data property is a plain noun-ish key like `clearAfterBattle`.
