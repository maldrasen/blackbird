```
application/helpers/item-helper.js
application/items/equipment-manager.js
application/records/ability.js
application/records/base-armor.js
application/records/base-weapon.js

data/abilities/basic-attack.js
data/abilities/dick-punch.js
data/abilities/sneak-attack.js
data/weapons/polearms.js
data/weapons/shields.js
data/weapons/whips.js

test/battle/models/defend-roll-spec.js
test/battle/models/physical-attack-contest-spec.js
test/battle/systems/battle-damage-system-spec.js
test/items/equipment-manager-spec.js
test/records/base-weapon-spec.js
```


*BUG* I was in a battle. I killed a kobold and the movement animation started playing. I clicked off the screen, hiding the browser window behind my IDE. When I activated the window the monster element that was moving got moved off the screen.