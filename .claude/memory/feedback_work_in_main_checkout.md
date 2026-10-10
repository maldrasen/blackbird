---
name: work-in-main-checkout
description: "User wants changes made directly in D:\\Work\\projects\\blackbird, not in auto-created .claude/worktrees"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 65e447f0-4df0-4e95-800c-d6c597433913
  modified: 2026-08-10T18:44:26.484Z
---

When a session starts inside an auto-created git worktree under `.claude/worktrees/`, the user does not want the work left there — changes belong in the main checkout at `D:\Work\projects\blackbird`, on whatever branch is currently checked out there (2026-07-05; recurred 2026-08-10 — edits made in a worktree were invisible to the user, who was working on `174-save-and-load` in the main checkout).

**Why:** The user handles all version control themselves (see CLAUDE.md — no git commands) and works off the main working tree; a side worktree on a `claude/*` branch just leaves files somewhere they didn't ask for and hides the diff from their review.

**How to apply:** Before editing anything, check whether the cwd is under `.claude/worktrees/`. If it is, make the edits in `D:\Work\projects\blackbird` directly (leave the main checkout's branch alone — don't switch it). If work already landed in the worktree, copy the changes to the main checkout, revert the worktree copies so the worktree stays clean, and run `bin/test.sh` from the main checkout. Regenerate `manifest.json` in whichever checkout the files land in (it embeds the file list, and new files under `application/`, `data/`, or `test/` must be in it).
