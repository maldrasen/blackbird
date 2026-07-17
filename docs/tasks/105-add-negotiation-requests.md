---
id: 105
title: Add Negotiation Requests
priority: 2
created: 2026-07-12
points: 8
tags:
  - battle
---
---
We've started work on the Negotiation system. In addition to asking questions the monsters will sometimes have requests. These will be yes/no questions that the player can agree to or deny. The monsters will ask for things like money, items, or mana, or maybe they'll just ask stab the player. Like the questions, a request will have reactions that can be overwritten more specific monsters. Each reaction should come with a map of feelings. 

Agreeing to a request will usually result in positive feelings, though sometimes agreeing to a request will have the opposite effect. Letting a monster stab you will just cause them to lose respect for you.

Unlike the questions though a request will sometimes have to have a random value. Like "Give me 50 mana" needs to randomly select the mana amount to ask for. The feelings awarded by the request should be tied to this random value, though we'll need a factor to define by how much. 

### Violent Requests
- Can I cut you, just a little bit?
- Really, I just want to punch you in the face, okay?
- Let me slap your tits around for a little.
### Lewd requests
- Hmm, lets if you're a good kisser.
- I want to see what your working with. So pull your dick out for me.
- Umm, show me your tits.
- I want to fuck, umm, that one over there. He says pointing at {character name}.
- How about you suck me off first.

---
**Notes (Claude):** Request infra is a bare stub — `NegotiationRequest.lookup` only returns the code, `negotiation-system.answer()` has a TODO for applying request feelings, and `negotiation-state.pickRequest()` returns a placeholder string. Build: the request record shape (yes/no, per-supertype/archetype reactions with feelings maps, overridable like questions), a random-value mechanic (e.g. "give me 50 mana") with a feelings-scaling factor tied to the rolled amount, overlay rendering (`negotiation-overlay`), plus content (the violent/lewd lists). Mirror the question system that already works ([[project_recruitment_negotiation_system]]).
