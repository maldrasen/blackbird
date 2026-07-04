// Ad-hoc headless runner: builds a dungeon floor and writes debug/floor-state.json.
// Usage: node debug/headless-floor.js [seed]
require('../bin/run-headless.js');

const seedArg = process.argv[2];
if (seedArg) { Random.seed(Number(seedArg)); }
console.log(`Using seed ${Random.getSeed()}`);

DungeonSystem.createDungeon();
DungeonSystem.setLevel(1);

console.log('Floor built. See debug/floor-state.json');
