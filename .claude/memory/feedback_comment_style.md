---
name: feedback-comment-style
description: "How to comment in this codebase — sparse, why-not-what; don't match file density"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c3fbe6d6-faca-4f69-88c8-b4271a66c930
---

Do NOT match the existing comment density of a file. The user's own comments are often heavy because he's still in design mode (noting *why* he did something, or how it will change in the future), not a style to emulate.

**Why:** Dense comments in the code are design-phase scaffolding for the user's own recall, plus the occasional section divider — not a house style. Restating what a line plainly does is noise.

**How to apply:** Comment sparingly. Good reasons to add a comment: (1) non-obvious *why* at a decision point / branch, (2) rare explanation of genuinely gnarly logic, (3) `// === Section ===` dividers to make a long file scannable (a different purpose than explaining code). Never state the obvious or narrate what the next line does. When unsure, err toward fewer. See [[feedback-avoid-else-if-chains]] and [[feedback-use-existing-helpers]] for other style defaults.
