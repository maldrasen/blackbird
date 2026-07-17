---
id: 110
title: Navigation Events
priority: 2
created: 2026-07-14
points: 8
tags: []
---
---
We need to sometimes trigger events when moving from place to place. We should have an episode queue with possible events that can trigger when moving from district to district. These are things that happen in town. The episode interrupts you as you move from place to place) There will need to be a global queue, and queues for each district and location. Sometimes events fire when you move within a district or arrive at a location. 

These episodes can be guaranteed to fire, or can have a possibility of happening. Events can also have requirements. Events can also be reoccurring or will reoccur until some condition is met. Other events will only happen once and be removed from the queue once they happen. We model the events as a queue because the events at the front of the queue should happen first, but then only if their requirements are met, and roll under their possibility.

---
**Notes (Claude):** An episode queue that can interrupt movement — a global queue plus per-district and per-location queues, with entries that are guaranteed or probabilistic, carry requirements, and are once-only vs recurring(-until-condition). Builds on the existing episode system (`episodes/episode-system`, `episode-state`) and hooks into `world/navigation-system`. The work is the queue model + requirement/probability evaluation + trigger points on move-within / arrive / district-change. Shares queue plumbing conceptually with [[026-sanity-system]]'s mindbreak enqueue.
