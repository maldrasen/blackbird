---
id: 021
title: Action Slot Sharing
priority: 3
created: 2026-07-03
points: 8
tags: [training]
---
---
It should be possible for multiple actions to use the same "slot". A player can be thrusting a dildo into their partner's pussy while licking their clit. That's two persisted actions that both target the pussy. Any kind of "double anal" type actions would also run into this problem. I think the way to handle this is for these "combined actions" to just be a type of follow on event. Anal sex could have an "add another cock" follow on that changes the anal sex action into a double anal action. This action still has exclusive use of the anus though. This means that every possible combination would need to be a separate action type, but I think that makes sense.

---
**Notes (Claude):** Let multiple persisted actions share a slot (dildo + clit licking; double-anal) by modeling combinations as follow-on actions that produce a distinct combined action which then holds the slot exclusively. Touches the `getUses`/slot model in `sex-action.js`, the `availableWhen` follow-on system, and `PersistedAction`. Design-heavy — the combinatorial explosion of action types is deliberate. Coordinate with [[039-grinding-follow-on-actions]] (follow-on availability keyed to specific persisted actions).
