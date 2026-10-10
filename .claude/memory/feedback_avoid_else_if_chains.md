---
name: feedback-avoid-else-if-chains
description: "User dislikes else-if chains, especially long ones — prefer early returns or a small helper function instead"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 16fbe3ef-13c8-4552-866b-9d5088d59286
---

Avoid `if / else if / else if` chains, particularly long ones. The user considers them a mild code smell.

**Why:** Each `else if` branch requires reading backwards through the preceding conditions to understand why you're in that branch — it hides the context needed to understand the current case.

**How to apply:** When a value needs to be classified/handled across several mutually-exclusive cases, prefer:
- A small helper function with early returns (`if (x) { return a; } if (y) { return b; } return c;`), so each case is self-contained and reads top-to-bottom without depending on the reader tracking earlier negated conditions.
- Or a `switch` statement when discriminating on a single enum-like value.

Example: in `application/looms/weaver-package.js`, `meetsRequirement()` replaced a 3-branch `if/else if/else if`
with three early-return checks in a dedicated function — same logic, no backward-reading needed.
