---
name: feedback-inline-single-use-constants
description: "Don't declare a constant that is only used on the very next line; inline the expression, especially when `?.` lets the lookup and call sit on one line"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 43068aa0-d52b-4c71-9085-acfffaa7db67
  modified: 2026-10-07T17:12:29.960Z
---

When a lookup is assigned to a `const` and that constant is used exactly once on the following line, inline it. With optional chaining this collapses `const button = X.first(sel); button?.click();` into `X.first(sel)?.click();`.

**Why:** On task 260 (2026-10-07) the user rewrote `pressCommand` and `pressTarget` in the battle views this way after I had only swapped the guard for `?.`, saying there is no need to define a constant that is only used on the next line.

**How to apply:** After converting a guard to `?.`, look one line up. If the subject was introduced solely to be guarded, fold it into the chain. Keep the constant when it is used more than once, when the expression is long enough that the name carries meaning, or when the user's own code keeps it. Related: [[feedback-ternary-over-chain-nullish]].
