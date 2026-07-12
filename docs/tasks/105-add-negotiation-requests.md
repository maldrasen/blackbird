---
id: 105
title: Add Negotiation Requests
priority: 2
created: 2026-07-12
tags:
  - battle
---
---
We've started work on the Negotiation system. In addition to asking questions the monsters will sometimes have requests. These will be yes/no questions that the player can agree to or deny. The monsters will ask for things like money, items, or mana, or maybe they'll just ask stab the player. Like the questions, a request will have reactions that can be overwritten more specific monsters. Each reaction should come with a map of feelings. 

Agreeing to a request will usually result in positive feelings, though sometimes agreeing to a request will have the opposite effect. Letting a monster stab you will just cause them to lose respect for you.

Unlike the questions though a request will sometimes have to have a random value. Like "Give me 50 mana" needs to randomly select the mana amount to ask for. The feelings awarded by the request should be tied to this random value, though we'll need a factor to define by how much. 
