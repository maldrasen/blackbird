# Review
```
application/items/armor.js
application/items/character-equipper.js
application/items/factories/armor-factory.js
application/items/factories/weapon-factory.js
application/items/weapon.js

test/battle/models/defend-roll-spec.js
test/battle/systems/battle-damage-system-spec.js
test/battle/systems/recruitment-system-spec.js
test/characters/factories/monster-factory-spec.js
test/items/character-equipper-spec.js
test/records/base-weapon-spec.js
```


### Review changes
Natural armor and worn armor should stack. We should keep most natural armor fairly low because of this. 

For kobolds and other species with natural armor, the armor values should be defined on the species. Allow the base monster to overwrite these default values. Also, each hit location can optionally have it's own reduction to make some areas more resistant than others, but should fall back to the overall armor value.

We need to remove the vestigial weapon shape from the attack table. An attack in the attack table should never be a weapon attack now. This will also let us drop fists from the weapons. Instead, punch, bite, claw, etc, should all be abilities. Then we can drop attack table entirely. 
