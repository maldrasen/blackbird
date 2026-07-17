---
id: 009
title: Descriptions
priority: 2
created: 2026-07-03
points: 13
tags: [character]
---
---
When I'm feeling like I need a break from the training systems, I should start writing some of the sex action stories and the body part descriptions. They're going to be a ton of work, so not something I want to tackle all at once. Better to work on them periodically. Should start with breasts or dicks first as they're both fairly complex. 

A character can have multiple descriptions, a description for each body part, a description for each item of clothing, an actor description, a body description, etc. Descriptions have a parent ID, an optional type (in case a single component needs something like a long and short form description), and the text. We'll save the text in the weaver template format, so it can be updated when needed.

---
**Notes (Claude):** Mostly a content stream, not new mechanics — `description-component.js` already exists and there are describers (`characters/describers/`). Score reflects total endurance ("a ton of work"); recommend splitting per body part into its own task (breasts, cocks, pussy, ass, mouth, actor/body, clothing) so each is a shippable ~3–5 chunk you can pick up when you want a break. Text authored as weaver templates ([[weaver-system]]); pass raw templates, mind double-weave ([[project_addmessage_weaves]]).
