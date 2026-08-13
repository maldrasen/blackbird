---
id: 183
title: Complete view seperation
priority: 1
created: 2026-08-13
tags: []
points: 5
---
---
We have some interfaces complete, but there are still some places where the main application code touches the view code. We should create interfaces for any system that still touches the view, and make sure they pass through an interface.

We also need to look at the interfaces. Most of them are just guarding with Tests.running(), but they need to also check HEADLESS. And there are a lot of places where just HEADLESS is checked. We should unify on a single function that can be called. Maybe Environment.viewPresent()