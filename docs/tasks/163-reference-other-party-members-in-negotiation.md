---
id: 163
title: Reference other party members in negotiation
priority: 1
created: 2026-08-06
tags:
  - negotiation
points: 2
---
---
The `no-interest-in-men` negotiation question has an answer that references another female party member. When we build the negotiation state we should include other party members in the context for questions like this. We were also going to need these people for negotiation requests involving them.
- `M`: A random male from the party
- `F`: A random non-male from the party (assume futas are female enough)
- `A`: A party member that the monster would be attracted to.

We need a NegotiationRequirement that checks to see if these keys have been set. A null M key would indicate that there are no other men in the party or that the player is alone.

With this question in particular, your party members should have their own feelings adjusted when you offer to pimp them out. If you don't already have that kind of relationship with them, it should upset them. I'm not going to have them say anything during the negotiation, but they should get a memory added at the very least, perhaps even a hate mark.
