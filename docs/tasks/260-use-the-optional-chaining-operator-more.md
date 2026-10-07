---
id: 260
title: Use the optional chaining operator more
priority: 2
created: 2026-10-07
tags: []
points: 3
---
---
I had kind of forgotten that the optional chaining operator (`?.`) even exists. We should look though the codebase, finding places where we're doing null checks "by hand" or across multiple lines, in an effort to simplify things.