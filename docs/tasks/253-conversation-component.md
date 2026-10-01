---
id: 253
title: Conversation Component
priority: 2
created: 2026-10-01
tags:
  - episode
points: 8
---
---
Starting a conversation with a person builds a page graph from that person's conversation data. This graph is then given to the episode system to run the conversation like it does with any paged episode. The conversation component will remember what topics have been discussed, keyed by topic code rather than page index. 

Topics that aren't specified in the person data can still come from the archetype or species, though I'll need to determine what kind of conversation paths are generic enough for that kind of fallback. Any conversation that you would have with a randomly generated recruited monster for instance. A night spent camping in a safe room in the dungeon, or visiting with a character in your home will need conversation topics for this.

We'll also want some kind of game state level conversation topic tracking. If the party has a goal they're trying to accomplish, like a quest, that should become a topic of conversation. Once that goal has been resolved though it should drop out of the topic list or change to a different "resolved" version of the topic for a while.