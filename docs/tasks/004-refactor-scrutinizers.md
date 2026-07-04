---
id: 004
title: Refactor Scrutinizers
priority: 2
created: 2026-07-03
tags: []
---
I had originally written the scrutinizers when I thought the data objects would be in JSON, and so the conditions were represented as strings. The conditions would be better if they were closures and the scrutinizer can build closures from arguments.
