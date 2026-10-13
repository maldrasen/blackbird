---
name: user-dev-environment
description: "The user's three machines, repo paths, and tooling quirks (python on the Windows box)"
metadata:
  node_type: memory
  type: user
  originSessionId: 3705562a-6b3a-42ad-88d1-6ae7e25e22c2
  modified: 2026-10-13T14:58:33.644Z
---

The user works across three machines with different repo paths: Windows (D:\Work\projects\blackbird), a Mac, and a Linux box. They avoid the Windows home directory for project files.

On the Windows box, `python`, `python3`, and `py` all resolve to Python 3.15 as of 2026-10-13. Before that only `py` worked, which caused silent "failed" Bash runs whenever a command shelled out to `python3`. Perl is also available in Git Bash and works for multi-line in-place edits.

**Why:** Bash scripts that reach for python3 silently did nothing on this machine before the upgrade, so earlier sessions reported failures without explaining them.

**How to apply:** Any of the three python commands is fine now. If a scripted edit reports "command not found", say which command failed rather than retrying blind. See also [[bash-heredoc-length-limit]].
