---
id: 170
title: Character Locations
priority: 2
created: 2026-08-08
tags:
  - character
points: 3
---
---
We have this situated component (consider a better name for that) and a character movement system but nothing uses it yet. This was one of the first components added, but we haven't done anything with it yet. The idea here was that characters would have their own lives, moving from location to location within the player's home. I think that's still the plan.

We have a problem now though were a recruited character is never located anywhere. Easy enough to fix by giving them a situated component, but we should look into the character AI needed to have them move around the house. Give them a schedule, needs maybe.

In this first pass of this feature I think we just need to make sure they have this situated component and a location. The home only has one room, so that should be everyone's default location for the time being. When a character is in the party though, their location should be whatever the game's current location in. Rather than updating the component every time they move. We can set their location to `(in-party)` in the party configuration. 

A location also lists the characters at the location. I think that we should exclude the party members from this list. They shouldn't show up there anyway if their location is (in-party).