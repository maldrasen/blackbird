---
name: memory-lives-in-repo
description: Auto memory is committed in .claude/memory and pointed at via a per-machine absolute autoMemoryDirectory in global settings; cross-project bleed accepted
metadata:
  type: project
---

Auto memory lives in the repo at `.claude/memory` so it travels between the user's three dev machines (Windows on D:, a Mac, and a Linux box, each with a different repo path). Decided 2026-10-10.

Each machine sets `autoMemoryDirectory` to its own absolute path in the global `~/.claude/settings.json`. The setting is deliberately NOT in the committed project settings: relative paths (`./memory`) silently fall back to the default (GitHub issue anthropics/claude-code#51394), and `.claude/settings.local.json` is sometimes ignored (#49995). Absolute paths can't be committed because they differ per machine.

**Why:** Keeping one memory per machine meant three divergent memories. A global absolute path is the only form that reliably works.

**How to apply:** Memory from other projects (e.g. blackbird-testbed) also lands here; the user accepts that while they're the sole developer and everything relates to Blackbird. Don't propose fixing the bleed. A separate memory repo pointed to by each project's local settings was considered and deferred as overkill. On a new machine the only setup step is adding the global setting with that machine's path (`~/`-prefixed paths are documented as valid on Mac/Linux). See [[work-in-main-checkout]].
