---
id: 006
title: Attitudes
priority: 2
created: 2026-07-03
points: 5
tags: [training]
---
---
When building a character's dialog it would be most useful to have some kind of general attitude value. The attitude should be based off of the feelings, current marks, control, and perhaps personality. Basically, doing the heavy lifting of figuring out where in that multidimensional space their current attitude lies, and flattening it into a single value we can switch off of. For example:
- Resistant (low control, no fear or respect)
- Curious (low affection, low or no respect, no fear)
- Cautious (no affection, low respect, moderate fear)
I think I may work on some of the events and dialog first, to see what kind of attitudes that it makes sense for a character to take.

---
**Notes (Claude):** A derived value: flatten feelings + current marks + control + personality into a single attitude enum you can switch dialog on. Likely a wrapper accessor or a small `AttitudeSystem` reading `FeelingsComponent`, `MarkComponent`, `ControlledComponent`, and `PersonalityComponent`. The design is genuinely unsettled — you want to author dialog first to discover the useful buckets, so treat this as a spike + implementation, not a clean build. Foundational: it unblocks [[007-position-attitude-requirement]] and feeds negotiation, [[028-orders]], and [[037-denial-reactions]].
