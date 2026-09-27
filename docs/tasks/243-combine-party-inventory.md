---
id: 243
title: Combine party inventory
priority: 1
created: 2026-09-27
tags:
  - character
points: 13
---
---
In working on the negotiation requests, and I think I've realized something important about SMT and I think Persona's design. Those game's also feature a demon negotiation system, where the demons can ask for items. Those items though, if they have them, all come from a single shared inventory. That way, the player character can be the one that negotiates, and they don't have to determine if the item they're giving away is in someone else's inventory. The Final Fantasy and Persona games handle consumables in the same way. The party has a single inventory. Equipment is on the character, but anyone can use any consumable in the inventory.

When I was developing the inventory system, I was thinking it should work more like Wizardry, or Baulder's Gate, where each party member has their own inventory and can only access the consumables they have on them. 

This becomes kind of a problem in the negotiation system though. What if you give all the loot items to one of your party members, and then the monster you're negotiating with wants something they have? If a monster asks for an item, and then you give them that item, should it be in their inventory when they join? That makes logical sense, but then it renders the negotiation pointless.

The looting process in the enlightenment view is needlessly complex. In the current design, If an item drops, you always need to decide who's inventory it's going into. If we have a single shared inventory that step goes away.

Combining the inventory is going to force a lot of changes in other places. The character overlay drops all the trading items between characters. The only thing that matters is the equipment, but that should probably change as well. Rather than equipping an item by clicking one in the inventory, we need to show the character's equipment slots. Clicking a slot needs to show the available equipment for that slot, and selecting an item there equips it. 

This task probably needs a design spike, first determining everything this touches. Rather than just ripping the old system out we should add an inventory to the game state, saving the entity ID like we do the player. Move everything character based to this new inventory, then finally drop it from the characters. The equipment depots still have their own inventory, and the interim loot inventory remains. These are actually kept separate. 
