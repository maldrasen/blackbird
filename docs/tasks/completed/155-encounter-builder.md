---
id: 155
title: Encounter Builder
priority: 2
created: 2026-08-06
tags:
  - battle
  - dungeon
points: 8
---
---
The encounters are a bit dumb right now, simple data records with a little randomness. Then we have a bunch of different records with different monster formations. It would be better if we could have a builder that builds an encounter intelligently.

First, this is needed for the fixtures, rather than randomly picking a encounter, sometimes I'll want to be able to build a specific encounter without having to add data only used by a fixture. In thinking about how I wanted to improve the fixtures though, I decided that it would be better to just make all the encounters work this way.

## Difficulty Level
First, we need to be able to build an encounter given an average difficulty level. We can use the base monster essence value to gauge how difficult a monster is. Then given a target essence for the encounter, we pick a group of monsters that fit within that essence cap.

> Calculating the average essence a monster can grant would be very difficult at runtime. We first need convert the essence report into a script that saves this monster essence data into a data file. If we write precalculated essence ranges to a js file the loader will just pick it up automatically. Unlike the compile manifest we don't need to rebuild the data every time the app is loaded, just when monster data is changed. Should be made part of a dist script though so that it's not forgotten. (We currently don't have a dist bash script, just the node script)

## Encounter Theme
Each dungeon floor has a theme, which defines what monsters can be encountered on that floor. We haven't implemented this yet, but each theme should have a list of monster types that can be encountered there. These types could be a category of monsters (which will also need defining) or specific base monsters.

## Related Monsters
An encounter should only include monsters that would work together. We only have a few kobolds so far, but the plan is to separate the kobolds into multiple clans, so the Deepdark kobolds wouldn't be in the same formation as Flamescales. A kobold runt though could be in either clan. Kobolds and vermen wouldn't be in the same party, but vermen could keep other more animal like monsters as pets. Not sure what the best way to define these relationships would be. Probably another data record to define a cohort. 

---

We'll need other builder options as well beyond just difficulty level. Some encounters should still be exact monsters in an exact formation. So I think we still need to keep the encounter records for special battles like this. We started this task because I want to be able to easily start a battle with a specific monster, so we also need to build an encounter from a base monster code or a formation and base monster codes. 

An encounter builder doesn't actually buy us much from the perspective of putting a fixture together, but I think it should provide a more interesting variety of encounters so I think it's still worth doing.