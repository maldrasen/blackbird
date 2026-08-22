---
id: 191
title: Create a battle testbed
priority: 3
created: 2026-08-16
tags: []
points: 13
---
---
I've been thinking we need something like this for a long time for balance purposes. The idea here is to make a node application that can load the app headlessly and perform automated integration testing of the battle system. Not simple unit tests. This would need to create a party of characters, build an encounter, and have the characters fight a full battle.

Normally I wouldn't consider something like this, but this is a prime example of something that can be completely vibe coded without being extremely worried about the overall code quality. The idea is that the testbed could run through a thousand battles, and produce a report that can be used for game balance decisions. If we find that some monsters are too difficult we can adjust their essence awards. Abilities that are too powerful can be scaled back. 

I think we'll want full and condensed versions of the report. The full report should have every console message, every log entry, which should allow us to fully recreate a battle. The condensed version is more about stats like win rates and total damage received in a fight. 

This is an epic task. First we just need to build an application that can build a party and execute a full battle. 
