---
id: 142
title: Item detail panel
priority: 2
created: 2026-07-25
tags:
  - character
points: 8
---
---
When an item is selected in the equipment panel, I'd like to show details for that item in a side panel. This panel should include item descriptions, weapon damage ranges, armor defense values, enchantment details. All that.

> When building the inventory overlay in task 246, I added the item detail panel as its own element. We still need to completely rework the equipment panel in order to use it though. Though the current equipment panel is functional, the feel of it is off to me. We weed to look into better ways of handling this interface.

### Proposed layout
A system similar to how Elden Ring handles equipment would work well here. The interface has a list of the slots on the left. This is important because the number of equipment slots may change depending on what body piercings a person has.

When a slot is selected we show all the items that can be equipped in that slot. Items need to be free in the party inventory, not equipped by someone else. We show the details panel as well with the equipped item details (or empty if blank). The details of an equipped item should should an unequip button to remove it.

Clicking on a candidate item shows it in the item details along with inline differences of what would change if that's equipped instead. An unequipped item has an equip button to change the equipment.

As a shortcut, double clicking on a candidate item should also equip or unequip an item.

```
┌─ Slots ────────────┬─ Candidates ──────┬─ Details ─────────────┐
│ Main Hand          │ >> Steel Sword    │ Iron Sword            │
│  >Steel Sword      │    Iron Sword <<  │ description…          │
│ Off Hand           │    Bone Spear     │ Attack Power 4–9 (+2) │
│  Empty             │    Pointed Stick  │ Attack Time  5  (–1)  │
│ Head               │                   │ Hands   Either Hand   │
│  Leather Cap       │                   │ Value   120           │
│ …                  │                   │ [Equip]               │
└────────────────────┴───────────────────┴───────────────────────┘
```

### Full Summary
When the tab is opened and when no slots are selected we should show a summary panel of everything the current equipment gives the character. We could probably reuse the detail panel for this as the layout is almost the same. It would need a third version of update that knows to build a summary given a character id. Because there are no candidates when no slots are selected the details can span the 2nd and 3rd columns.

### Keyboard Shortcuts
up/down within a column, left/right between columns, Enter to equip.
