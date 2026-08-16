---
id: 188
title: Separate CharacterMath
priority: 3
created: 2026-08-16
tags:
  - character
points: 2
---
---
CharacterMath is too broad, and the functions are spread across multiple systems, but generally a function only applies to one system or another. We need to split this module into multiple modules, placing them into the systems where they belong.