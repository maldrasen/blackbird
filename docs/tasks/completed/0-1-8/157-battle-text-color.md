---
id: 157
title: Battle Text Color
priority: 2
created: 2026-08-06
tags:
  - battle
points: 3
---
---
As a nod to the Wizardry games, the battle text colors certain elements like character and ability names. This was implemented in a quick and dirty way. I think it's time to look into refactoring this. Also, while the colored text works in the battle messages, I don't think I want the colors used in other views, like in the negotiations. I think if the weaver just adds classes to the replaces spans for things like weapon name and character name, we can just nest the color rules for those spans under the battle text element.