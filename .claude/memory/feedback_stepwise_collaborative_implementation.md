---
name: feedback-stepwise-collaborative-implementation
description: "For large/architecturally-uncertain tasks, implement one small piece at a time with discussion between each, not a big batch from the approved plan."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d7f15162-5f20-4883-ad91-939703673df8
  modified: 2026-07-19T17:32:35.742Z
---

When a plan covers multiple files/systems, don't execute it end-to-end in one pass. Implement one step, report what changed, and wait for the user to direct the next step. The user often reconsiders design decisions mid-implementation (e.g. during [[project_game_start_event_task100]] they cut a freshly-built `Quirk` record+component after building it, once they noticed it duplicated the existing `AspectsComponent`) — small increments make that kind of course-correction cheap instead of requiring a revert.

Also apply this to architectural reasoning itself: when the user thinks out loud about a design ("I'm thinking my way through this..."), engage as a discussion — confirm the reasoning, surface the concrete wrinkle it creates elsewhere in the code, propose one specific shape — rather than jumping straight to an implementation.

Plan-talk is not a work request. When the user shares direction or upcoming goals conversationally ("Need to add a lot more low level monsters now"), that's context, not a go-ahead — respond in discussion, and wait for an explicit ask before touching code. Confirmed 2026-07-19 when the user interrupted tool calls after such a remark: "I was just talking about plans, I didn't want you to actually implement anything there."

**Why:** Stated directly ("Let's take this slowly... one small step at a time") after a large multi-system plan was approved. Confirmed again when the user pushed back on writing tests for freshly-added code, arguing generic "doesn't blow up" specs wouldn't have caught the actual bug that shipped (a missing `AttributesFactory.adjustAttributes()` call) and that the code paths will get real exercise through play anyway — so don't assume tests are wanted just because a plan calls for them; check if they'd have actual signal first.

**How to apply:** After a plan is approved, ask (or infer from the user's own framing) whether they want it executed as one continuous pass or step-by-step with check-ins. Default to smaller steps for anything touching multiple systems or introducing a new data pattern. Keep a living plan/progress doc (see [[project_game_start_event_task100]]) updated as steps land and as scope changes, rather than treating the originally-approved plan as fixed.
