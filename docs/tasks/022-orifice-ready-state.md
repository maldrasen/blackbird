---
id: 022
title: Orifice Ready State
priority: 3
created: 2026-07-03
points: 5
tags: [training]
---
---
Actions like `insert-cock-anus` or `insert-cock-pussy` are a little unusual. If an orifice hasn't yet been fucked, we should only show this 'insert' action. Once the orifice has been opened up and ready though you can start fucking it for real at any point. Actions that go from ass to mouth, then back to ass won't need to handle the insertion action once again. Going back to ass fucking should resume whatever thrusting state we were in.

---
**Notes (Claude):** Track a per-orifice "opened/ready" state so `insert-cock-*` shows only before an orifice is opened and full fucking becomes available afterward. Also persist thrust state so returning to a previously-used orifice resumes it. Needs orifice state on the training state (or a small component) plus availability logic in `sex-action.js` `isAvailable`. Pairs with [[003-persisted-action-controlls]] (the thrust params being resumed) and [[042-all-the-way-though]].
