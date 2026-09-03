// Shared bootstrap for headless scripts. Sets up the globals normally provided by main.js/loader.js and loads the
// application and data lists from the manifest (never the view list), so the dungeon/character/battle systems are
// ready to use in plain Node.
// Usage: require('../bin/run-headless.js') from a script anywhere in the project before touching app globals.

global.fs = require('fs');
global.ROOT = require('path').normalize(`${__dirname}/..`).replace(/\\/g, '/');
global.DATA = ROOT;
global.ENVIRONMENT = 'development';
global.HEADLESS = true;

require(`${ROOT}/application/environment.js`);

const manifest = require(`${ROOT}/manifest.json`);

[...manifest.applicationFiles, ...manifest.dataFiles].forEach(path => require(`${ROOT}/${path}`));

Application.init();
