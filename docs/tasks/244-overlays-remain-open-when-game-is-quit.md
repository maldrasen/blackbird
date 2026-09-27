---
id: 244
title: Overlays remain open when game is quit
priority: 1
created: 2026-09-27
tags: []
points: 3
---
---
Bug: If you quit the game while a negotiation is happening the negotiation overlay will remain open and still has it's content. This may be true for other overlays and such as well. Rather than handling this as a special case, I think we need to add some kind of UI reset on game quit. 