# Todo List
Just as good as project management!

---

# Primary Tasks

### Training Systems
First primary task is to get the training system in a workable state. That's the primary focus of the game, so I want
to make that work before including anything else like day to day exploration, events, combat, anything that's not 
directly related to training, stubbing things out as needed. 

Current focus in on the body parts as they are directly related and necessary for the calculations that the training
systems will need to do. Does this part exist, does it fit into this other part? Detailed part descriptions and text 
could be done later, though I don't want all that work building up. Better to take care of descriptions over time than 
to have a mountain of them to do in the future.

---

# Secondary Tasks

### Sanity System
Some training actions will damage a character's sanity. We should have a system that slowly increases sanity. Maybe by
default this could be a single point a day, but a comfortable environment will raise that. Conversely, a particularly 
bad environment (enforced bondage rules) would drop sanity every day. If sanity drops to 0 overnight, we could enqueue
a mindbreak event where the player finds the character in a broken state.

---

# Long Term Plans

### Tails and Horns
I'm going to build the body with tails and horns as simple string types at first. I think this will work in most cases.
It's usually enough to simply state that a character has a dog tail for instance. Eventually I'll want to include 
things like tail cocks, which will need a more complex tail component that has a child cock component. The same could
be said for some kind of unicorn horn type cock. Dicks everywhere! We can do this by setting the type to _component, 
then we would know that the details can be found in a Tail or Horn component. Not just dicks, but something like horn
length or color might be important.

### Body piercings
The various body components either have associated components or have the body piercing data on the component itself.
It kind of makes sense to just have piercing information as properties of the component. The breast component could 
have a simple piercingType property. However, depending on how deep I want to go here, a piercing component could be
a child of another component. The breasts could have several piercings at once, nipple bars and areola rings at the 
same time. Each piercing could have a material. They could even carry enchantments so they would also count as 
equipment. And if that's the case then we'd need to see about equipping and unequipping various body piercings as a 
type of jewelry. Definitely more of a long term goal.

### Sexual History
One thing that's often tracked in Era games is who a character lost their various virginities to, first kisses, first
anal fisting, all that. That's never really interested me, but something that some players might care about. It's easy
enough to keep track of virginity status for already virgin characters. For players who start with some experience 
though there's no way to really construct a whole sexual history that's connected to other characters. I could just 
specify that it's someone you don't personally know. That might be the cleanest implementation. I should differentiate 
between someone you don't know and someone who the character themselves don't know, which has a different implication.
I could also spell out their relationship. Was it their boyfriend, their boss, their father?  

### Future Sex Actions / Features / Body Part Types
- Fuckable Nipples / Nipple cunts / Breast wombs and pregnancy
- Dick Nipples
- Penis tongue
- Fuckable Navel
- Ear Canal Penetration
- Ovipositors
- Tentacle Magic
- Internal Tentacles
- Vomit play


