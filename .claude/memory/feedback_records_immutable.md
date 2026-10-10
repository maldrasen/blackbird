---
name: records-immutable
description: "Registry records (BaseWeapon, BaseArmor, etc.) are canonical immutable data — never parameterize lookup()"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5b1916c1-df92-4cf6-b7f0-75ba1308137b
  modified: 2026-08-01T03:25:45.271Z
---

The user rejected `BaseWeapon.lookup(code, { material })` during task 141: passing options into a record lookup means the same code returns different data, so the record stops being a canonical immutable data object.

**Why:** The record layer is Era-style fixed data; anything holding a record must be able to trust its numbers match what was registered. Per-instance variation belongs on components/items, and derived data belongs in new registered records.

**How to apply:** Keep `lookup(code)` zero-argument. When a derived flavor of a record is needed, register it as its own record at load time (see `registerVariant` in [[monster-equipment-task141]]) rather than computing views at lookup.
