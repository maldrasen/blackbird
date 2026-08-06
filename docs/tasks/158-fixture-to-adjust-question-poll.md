---
id: 158
title: Add a Fixture to Adjust the Question Poll for Testing
priority: 2
created: 2026-08-06
tags:
  - negotiation
points: 3
---
---
We need a fixture that can reduce the number of available negotiation questions, so that a specific set of questions can be tested in insolation. We need to do this after the negotiation requests though, in case we want to isolate just one question. That way we'll have requests to fill in the extra interactions and we won't throw an error after the one question.