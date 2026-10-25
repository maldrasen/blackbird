---
name: specs-dont-pin-data
description: "Don't write specs that assert the contents of tunable data tables (depot stock, frequencies, drop tables); assert the mechanic that reads them"
metadata:
  type: feedback
---

A spec must not hard-code what a data table contains: which arrows a depot lists, their weights, what a loot group holds. Assert the mechanic instead, for example that the loaded arrow is one of the keys of the depot's own map, or that a quantity falls within the constant's range.

**Why:** The user deleted a spec that pinned the vermen and kobold ammunition maps (task 229, 2026-10-24) because "a spec for this makes it too hard to change the data", and then changed the data the same day. Content and balance tables are meant to be tweaked freely.

**How to apply:** Real shipped records are still the right fixtures ([[spec-style]]), and hard-coded expected values are fine for formulas and mechanics. The line is whether the value under test is a rule or a tuning knob. For a knob, read the expectation from the same record or constant the code reads.
