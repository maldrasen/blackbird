// Ad-hoc headless runner: builds a dungeon floor and writes debug/floor-state.json.
require('../bin/run-headless.js');

DungeonSystem.init();
DungeonSystem.createDungeon();
DungeonSystem.setLevel(1);

console.log('Floor built. See debug/floor-state.json');
