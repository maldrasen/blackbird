---
id: 198
title: Room Contents
priority: 1
created: 2026-08-23
tags: []
points: 8
---
---
I had the nightgaunt episode possibly included in this milestone, but after working on it for a bit, doing the needed prep work, such as adding the mana component, I realized that I'm also going to need to do a lot more work with features and room contents and such before it can be done.

In the episode we want to generate a dungeon floor that's guaranteed to have a mana font feature. The mana fonts are special enough that they should have their own feature type, with it's own look and feel. The room in the feature needs to have a contents that can hold an episode that fires when the room is entered. 

This is a general case though, so I think we first need to start randomly adding contents to the other dungeon rooms because right now everything is completely empty. From my original plan:

> Rooms can have a variety of 'contents'. A room can contain a short event that starts a fight, or a longer event where choices would need to be made, including negotiations with groups of not quite hostile monsters. Normal dungeon stuff, traps, treasure. They could run into a vender. There are shrines where spells and abilities can be learned, or mana pools can be deepened. The dungeon view will at least need to show a room description, show available exits, and general commands. When we change room we can start an event, and could start a combat directly.

We have the exits taken care of as their own elements in the dungeon floor now, but rooms still need descriptions and random events (as episodes) and such.

### This Task
I think this task needs to take care of the simplest cases first. We'll should show an empty room descriptions from the theme when the room has no actual contents. The rooms aren't necessarily empty, they're just empty in the game play sense that there are no traps, or treasure chests, or events. There's still furniture, set dressing, interesting things to see that set the mood. 

I think a room with a randomly generated resource node of some kind is the simplest contents we can start with. A room with a patch of dungeon tripe that can be harvested is a good candidate. The contents would need a description, and a harvest command. The dungeon controls will need a list of buttons for room commands. Not sure yet if commands are completely general and the harvest button is always there, but disabled when unavailable, or if commands are entirely flexible and each room contents can tell the controls what actions are available in that room. Leaning towards the latter though as the result of the harvest command would have to come from a closure that defines what was harvested and the message from harvesting whatever the room has.

>I think most games would follow a design where a room may have a resource and there's a single function that handles harvesting the resource and printing a generic message. I don't really see a reason to do that when having a slightly different message any time a similar action is done adds more variety.


