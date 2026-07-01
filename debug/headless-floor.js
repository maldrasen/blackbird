// Ad-hoc headless runner: loads the non-view portion of the app and builds a dungeon floor.
global.fs = require('fs');
global.ROOT = require('path').normalize(__dirname + '/..').replace(/\\/g, '/');
global.DATA = ROOT;
global.ENVIRONMENT = 'development';
global.HEADLESS = true;

require(`${ROOT}/application/environment.js`);
require(`${ROOT}/application/views/general/console.js`);

const manifest = require(`${ROOT}/manifest.json`);

manifest.fileList
  .filter(path => !path.startsWith('application/views'))
  .forEach(path => require(`${ROOT}/${path}`));

DungeonSystem.init();
DungeonSystem.createDungeon();
DungeonSystem.setLevel(1);

console.log('Floor built. See debug/floor-state.json');
