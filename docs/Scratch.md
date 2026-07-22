```
application/battle/battle-interface.js
application/battle/battle-state.js
application/battle/systems/battle-damage-system.js
application/battle/systems/battle-death-system.js
application/battle/systems/formation-manager.js
application/battle/systems/physical-attack-system.js
application/components/health-component.js
application/dungeon/dungeon-system.js
application/enlighten/enlighten-state.js
application/enums.js                                                           application/helpers/english-helper.js
application/negotiations/negotiation-system.js
application/test/tests.js

application/views/elements/bar-display.js
application/views/enlighten/enlighten-view.js
bin/soak-tests.js
data/abilities/basic-attack.js

test/battle/battle-state-spec.js
test/battle/systems/battle-damage-system-spec.js
test/battle/systems/battle-death-system-spec.js
test/characters/level-system-spec.js
test/components/health-component-spec.js
test/enlighten/enlighten-system-spec.js
test/records/sex-position-spec.js

views/enlighten.html
```

- Clean up enlighten view state. There's a showVictory() function in the battle interface that we need to clean up. First, it should be showEnlighten(). We shouldn't need to pass the party like this. Should be simple to determine who is still alive from the current party configuration. Not part of this code review though as we do need this list of revived to generate messages for.

