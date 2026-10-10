---
id: 238
title: Equipment details
priority: 3
created: 2026-09-26
tags:
  - character
points: 0
---
---
Equipment will eventually need details of some sort. These will mostly be used when generating the description for the equipment. A silk doublet for instance should at least include a color property so that the color can be included in the description. Specific NPCs that I want to have some control over their look can include these details in the equipment factory options.

Most of these details will be cosmetic only. A doublet with silver buttons is no different mechanically from one with gold buttons. The details of some accessories may have game play implications though. For plugs especially (anal, nipple, urethral) we'll need to know their width. We may need to know weight and gauge on body piercings. These values will need to be interrogatable by the weaver in some sex actions. 

Once the equipment details are in we can give each base equipment a describer function that puts together a brief description of the item, though this should be done as a series of follow on tasks to this.

> Task 237 gave the item component a list of style tags. Right now the factory only joins the base record's tags with the primary material's. Once details exist they should add their own tags when the item is built: skull embellishments or black cloth make an item morbid, bows or ruffles make it cute, gold buttons make it lavish. The equipper and `EquipmentTaste` already read whatever tags are on the item, so nothing downstream needs to change for the new tags to count.
