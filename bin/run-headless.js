// Shared bootstrap for headless scripts. Sets up the globals normally provided by main.js/loader.js and loads
// every non-view file from the manifest, so the dungeon/character/battle systems are ready to use in plain Node.
// Usage: require('../bin/run-headless.js') from a script anywhere in the project before touching app globals.

global.fs = require('fs');
global.ROOT = require('path').normalize(`${__dirname}/..`).replace(/\\/g, '/');
global.DATA = ROOT;
global.ENVIRONMENT = 'development';
global.HEADLESS = true;

require(`${ROOT}/application/environment.js`);
require(`${ROOT}/application/views/general/console.js`);

const manifest = require(`${ROOT}/manifest.json`);

manifest.fileList
  .filter(path => !path.startsWith('application/views'))
  .forEach(path => require(`${ROOT}/${path}`));
