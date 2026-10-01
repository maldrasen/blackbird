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

Starting a conversation will have several entry points. The simplest one for this task would be from the "Character Interactions" in the character overlay.

Topics that aren't specified in the person data can still come from the archetype or species, though I'll need to determine what kind of conversation paths are generic enough for that kind of fallback. Any conversation that you would have with a randomly generated recruited monster for instance. A night spent camping in a safe room in the dungeon, or visiting with a character in your home will need conversation topics for this.

The root of the graph will need to be some kind of topic hup. "What did you want to talk about?" This topic hub will have to be live, with each topic gated with a requires property, so that way topics can be shown or hidden as the conversation progresses.

We'll also want some kind of game state level conversation topic tracking. If the party has a goal they're trying to accomplish, like a quest, that should become a topic of conversation. Once that goal has been resolved though it should drop out of the topic list or change to a different "resolved" version of the topic for a while.

This assumes some kind of quest system, though some unlocked topics don't necessarily need to be from a formal quest. In task [178] the "Dungeon Tripe Episode" for instance we would add a topic about "dungeon tripe" the first time you find one in the dungeon. Then, when your party is camping or something, you could talk to someone about it and they could tell you why it's called that. This removes the topic, so that it's not something that everyone always wants to talk about. 
