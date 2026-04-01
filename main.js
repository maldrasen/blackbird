
try {
  global.Electron = require('electron');
  global.ROOT = require('path').normalize(`${__dirname}`).replace(/\\/g,"/");
  global.DATA = Electron.app.getPath("userData")
  global.ENVIRONMENT = process.argv.includes('--development') ? 'development' : 'production';

  require(`${ROOT}/application/environment.js`);
  require(`${ROOT}/application/server.js`);
  require(`${ROOT}/application/browser.js`);

  Server.init();
  Browser.init();
}
catch(error) {
  console.error('=== Error Booting Application ===');
  console.error(error);
  Electron.app.exit();
}
