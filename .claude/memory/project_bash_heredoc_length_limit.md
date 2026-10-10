---
name: bash-heredoc-length-limit
description: On this Windows machine a Bash tool command over ~8 KB fails to parse (unexpected EOF); write larger files with the Write tool
metadata: 
  node_type: memory
  type: project
  originSessionId: ee36feb2-43e5-4e51-afda-310310dbdb01
  modified: 2026-09-22T17:41:41.775Z
---

A Bash tool command longer than roughly 8 KB (a heredoc writing a ~160 line file) failed with `unexpected EOF while looking for matching quote` and never touched the file, while a 6 KB heredoc in the same session worked. The content was fine; it's the Windows command-line length limit.

**Why:** the failure is silent about its cause and looks like a quoting bug in the file content, which wastes time hunting for one.

**How to apply:** use the Write tool (or Edit) for any file over ~5 KB, and keep shell heredocs for small files. Reading the target back after a failed write confirms whether it was touched (it wasn't, in the case seen).
