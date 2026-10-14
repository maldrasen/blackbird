---
name: python-edits-preserve-lf
description: "Repo files are LF; python read_text/write_text on the Windows box rewrites them as CRLF, turning a small edit into a whole-file diff"
metadata:
  node_type: memory
  type: project
  originSessionId: 39d282e2-56ee-451a-973d-64f6177a8e37
  modified: 2026-10-14T17:45:39.086Z
---

The repo's source files are committed with LF endings (`git ls-files --eol` shows `i/lf`). On the Windows machine, editing a file with Python's `read_text()`/`write_text()` converts every line to CRLF, so `git diff` shows the entire file changed (seen 2026-10-14 on task 229).

**Why:** Python's text mode uses universal newlines and writes the platform default on save. Git has no autocrlf normalization configured here, so the CRLF bytes land in the working tree as-is.

**How to apply:** When scripting edits from Bash, use `read_bytes()`/`write_bytes()` (or `newline=''`) and match the snippet's newlines to the file's. If a diff suddenly covers every line, check `git ls-files --eol` and re-normalize to LF from `git show HEAD:path` rather than committing the churn. Related: [[bash-heredoc-length-limit]].
