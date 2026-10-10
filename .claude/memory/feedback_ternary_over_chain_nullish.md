---
name: feedback-ternary-over-chain-nullish
description: "User prefers `x ? x.y : null` over `x?.y ?? null`; use `?.` where it deletes a guard outright, not where `??` has to restore a fallback"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 43068aa0-d52b-4c71-9085-acfffaa7db67
  modified: 2026-10-07T16:42:37.338Z
---

Prefer the explicit ternary `x ? x.y : null` (or any literal fallback) over `x?.y ?? null`. Optional chaining is welcome when it replaces a guard outright: `x && x.y`, `if (x) { x.y(); }`, `(x || {})[k]`, `if (fn) { fn(); }`. It is not wanted when the result then needs `??` to put a fallback back.

**Why:** On task 260 (2026-10-07) the user reverted `weapon?.getId() ?? null` in `application/battle/models/physical-attack-roll.js`, saying the ternary was easier to parse. A chain followed by `??` makes the reader hold two short-circuit rules at once.

**How to apply:** When sweeping for `?.` candidates, skip ternaries whose alternate branch is a literal. A bare `x?.y` with no `??` is fine when the next line already checks `== null`. The task doc for 260 lists the skipped sites under "Judgement calls".
