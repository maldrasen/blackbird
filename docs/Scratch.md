```
test/battle/battle-state-spec.js
test/battle/systems/battle-damage-system-spec.js
test/battle/systems/battle-death-system-spec.js
test/characters/level-system-spec.js
test/components/health-component-spec.js
test/enlighten/enlighten-system-spec.js
test/records/sex-position-spec.js
```

- Clean up enlighten view state. There's a showVictory() function in the battle interface that we need to clean up. First, it should be showEnlighten(). We shouldn't need to pass the party like this. Should be simple to determine who is still alive from the current party configuration. Not part of this code review though as we do need this list of revived to generate messages for.

