---
name: user-dev-environment
description: User works across three machines (Windows D: drive, Mac, Linux) with different repo paths; avoids the Windows home directory
metadata:
  type: user
---

The user develops Blackbird on three machines: Windows (repo at D:\Work\projects\blackbird), a Mac, and a Linux box, each with a different absolute repo path. On Windows they deliberately work out of the D: drive, not the home directory, because too many programs dump files there. Anything that assumes a single machine or a home-relative repo path will break for them. Related: [[memory-lives-in-repo]].
