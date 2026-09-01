---
id: 189
title: Attribute must be read from wrapper
priority: 1
created: 2026-08-16
tags:
  - character
points: 5
---
---
I was thinking about adding diseases that could lower attributes and realized that we need a consistent way to buff and debuff character attributes. We already have one in the `Attributes` wrapper, but I'm sure the way we access the attributes component is inconsistent. Sometimes we use `AttributesComponent.lookup` directly, which is correct for systems like the leveling system where we need to know the actual values. Almost every other system though will want the normal, buffed, or debuffed values and must get them through the wrapper.