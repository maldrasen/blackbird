---
id: 144
title: Complete Negotiation Rewrite
priority: 1
created: 2026-07-30
tags:
  - battle
  - negotiation
points: 13
---
---
I'm splitting this into a new task, because this task has grown well beyond writing more negotiation questions, though that is something that still needs to be done. We can add more questions over time, but first we should go through all the TODOs and loose ends in the negotiation system to get it into a working state again.

### Split into follow-up tasks (2026-07-30)
This task turned out to be too big for one pass, so it was broken into functional units, each carrying its slice of
the design:
- [145] Negotiation Resolution State — unified resolution data in NegotiationState
- [146] Implement givePreferences — the throwing stub in NegotiationReaction
- [147] Negotiation Interface Shim — headless-safe NegotiationInterface, overlay cleanup
- [148] Negotiation Stage Machine — advance/answer/executeResolution flow and battle wiring
- [149] Recruit Control Passthrough — negotiated control carries into ControlledComponent

Suggested order: 145 first, then 146/147/149 in any order, then 148 to integrate. Out of scope for all of them:
requests (105), real resolution text (107), conversation skill (134), and new question content.