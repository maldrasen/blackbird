---
id: 242
title: More Negotiation Requests
priority: 2
created: 2026-09-26
tags: []
points: 5
---
---
We added a single negotiation request in task 105 to build the framework for them and include them in the negotiation system. Now we can go back and start adding a lot more of them, including the ones that I had originally thought of in the first task.

### Item Requests
Most of the new requests should focus on giving out items or articles, valuables or consumables especially. These requests can use the article tags to match something that the monster might be asking for. If they ask for something to drink we can see if the character has any article tagged with alcohol. If there are multiple matching items we could give the player a few options of what to offer, with higher value options producing better reactions. 

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

Some lewd requests shouldn't be too difficult to implement. We already have a "whip you dick out" negotiation state that this could hook into. Something like fucking one of your other party members though is far more complex. We'd want to adjust the feelings of the pimped out character, save a memory, may even earn a hate mark for doing so. All planned systems, none of which are implemented yet.

For now just implement what we feel like doing and save the rest for follow on tasks. Like most of the content, this will be kind of a rolling task.
