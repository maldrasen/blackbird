---
id: 208
title: Six Blade Knife Episodes
priority: 3
created: 2026-08-30
tags:
  - episode
points: 13
---
---
In the `orchard-kobolds` episode you first encounter a group of kobolds, taking a break, picking apples. This episode starts a quest chain where you get to know this group of kobolds. It's possible that you could just immediately attack them. If you start a battle with them this sets a `six-blade.status=killed` flag. The kobolds don't necessarily need to be dead, you could even recruit one to your party in this battle. If this flag is set though we can assume they're dead, and all this means is that future events with them won't show up. This orchard event is reoccurring until you successfully convince them to let you pick some apples. This sets `six-blade.respect=1` which will allow other episodes in the chain to start happening.

I'm adding this task as an epic, to add more episodes involving this group. Each follow on episode can be done as its own task.

### Build NPC records for the kobolds.
When we encounter them again, we should build full NPC records for them. Give them names, real body components, etc. All I know about them now is that their leader has dark scales a broken horn, so we might need to add a new horn type. Having dark scales implies that they're part of the DeepDark tribe. This party of kobolds is 6 men, so we need to make sure that the party "sneak slut" is also male. The "orchard-kobolds" encounter defines the group as having a dick puncher (the leader), two tossers and two trappers, but we can be flexible with that.

### The Kobold Perspective
The goal with this chain is to establish a contact with the kobolds in the dungeon. While they'll try and attack and kill the adventurers, they're just doing that for fun. The kobolds real enemy are the vermen, who they're pretty much always at war with. The kobolds will eventually try and get the party to side with them against the vermen. Once the party has proven themselves to be the kobolds allies, they'll be allowed further into the dungeon. There will also be a parallel chain with a group of vermen who are trying to get the party to side with them, as well as a third option to let you work with both of them. You'll still be attacked by random groups either way, but just because that's what they enjoy doing.

Having a good reputation with the Six Blade Knife isn't necessary to progress the game, but it should help in future events where we're negotiating with the kobold leadership, and will unlock some unique crafting recipes or special abilities and such.

### Next Episodes
I think for the next encounter we find the kobolds fighting a group of vermen. I think we can be given another choice here to side with the kobolds (who we recognize), side with the vermen against the kobolds, or watch how the battle unfolds. In order to progress the chain you have to side with the kobolds and kill the vermen. We'll need a way for an episode to start a battle, then return to a new episode after it's over. In the after battle episode we earn a little respect from them so that the next time we run into them we're on good terms. They introduce themselves as the Six Blade Knife, and we start to get to know them.






