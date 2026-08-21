---
id: 015
title: Battle Encounter Tables
priority: 3
created: 2026-07-03
points: 8
tags: [battle, dungeon]
---
---
Once we have more work done on the dungeon we'll need to be able to start battles from the dungeon rooms. Some rooms will have specific battle data, but most of the time the battle data will come from the dungeon level encounter table. Not every battle will be in the dungeon though, so we need to account for scenario driven encounters and such as well.

---
**Notes (Claude):** The `Encounter` record, `encounter-builder`, and some encounter data already exist. The work is wiring: assign encounter data (or a level encounter table) to dungeon rooms, trigger a battle on entering, and roll the encounter from the table. Needs a new encounter-table concept (weighted by dungeon level/theme) plus a path for scenario/room-specific fixed encounters. `dungeon-navigation-system.moveToFeature` already returns `{encounter}` and the view starts the battle ([[project_dungeon_navigation]]) — so the dungeon→battle seam exists; this fills in what encounter to build.
