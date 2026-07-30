---
id: 149
title: Recruit Control Passthrough
priority: 1
created: 2026-07-30
tags:
  - battle
  - negotiation
points: 1
---
---
`RecruitmentSystem.recruit()` hardcodes `ControlledComponent.create(monsterId, { control:100 })` and ignores the
control value built up during the negotiation — even though `NegotiationState.getFeelings()` deliberately returns
control unclamped, with a comment about the −500..500 range. The negotiated control should carry through to the
recruit. Split from task 144; independent, exercised end-to-end by task 148's join flow.

### Changes
- `application/battle/systems/recruitment-system.js`: destructure `control` alongside affection/fear/respect and pass
  it to `ControlledComponent.create` (which validates −500..500) instead of the hardcoded 100.
- Update `test/battle/systems/recruitment-system-spec.js` — it currently passes `control:0` but asserts 100.
