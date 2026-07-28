---
id: 143
title: Refactor Character Factory
priority: 3
created: 2026-07-28
tags:
  - character
points: 3
---
---
Character factory is due for a rewrite. With the other systems I've done what I can to separate the working state out into it's own object. The character factory works by passing all these data objects around into the various sub factories. It would be cleaner if there was a character factory state that all the factories could access, modifying their particular data block. Then, when everything is built and correct, we build the character from the factory state.

This shouldn't be that much work. We're mostly just changing function signatures, removing the parameter passing in favor of looking data up in a centralized state.
