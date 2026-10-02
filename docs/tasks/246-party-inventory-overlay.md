---
id: 246
title: Party inventory overlay
priority: 2
created: 2026-09-27
tags:
  - character
points: 5
---
---
The combined party inventory needs its own view. The character overlay's inventory tab is gone, so until this task lands there's no way to see the inventory at all. This new overlay will need to be opened from the location and the dungeon controls. We can list items and articles together. Clicking on an item will show details about that item in a separate panel, and display commands for that item.

### Using Consumables 
Since we can use a consumable item on any party member, using an item needs a targeting step. One problem the previous version was that using a healing item didn't show an updated health bar for the character healed. I think we should probably include all of the party members on this view, either in a row on the top or a column on the side. Party members can be clicked on to select them. Using a consumable uses it on the selected party member. Rather than showing an overlay (which needs a separate click to dismiss) A simple consumable can be show a message as an alert, though some items may be complex enough to need the consume overlay. 

### Drop
The drop command is much simpler, as it can simply show a confirmation dialog then destroy an item. We may need to do something to mark quest items though as unremovable. Cursed items may also exist that can't be dropped or unequipped.

### Using Consumables in Battle
Using a consumable item is battle is slightly different, and may need its own interface. Only certain items can be used in a battle. You can swallow a small vial of healing potion, but couldn't eat an entire apple... probably. Picking an item to use should also use the battle's existing targeting controls, if an item can be used on someone else. Drinking a potion for instance should be something that a character must do themselves. Another party member can't use a potion on someone else, but something like a wand could be. The consumable effects are put into the battle messages as well. We may be able to share an the item list and item details between the views, but everything around them are different.