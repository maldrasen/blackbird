---
id: 204
title: Add a health system
priority: 1
created: 2026-08-26
tags:
  - character
points: 3
---
---
In the ConsumableEffect where we add health, we get the component, and calculate the amount healed directly on the component, whereas when we restore mana we use a mana system to do the same thing. We should really have a health system that does this so that we're not repeating code.