
try {
  global.Electron = require('electron');
  global.ROOT = require('path').normalize(`${__dirname}`).replace(/\\/g,"/");
  global.DATA = Electron.app.getPath("userData")
  global.ENVIRONMENT = process.argv.includes('--development') ? 'development' : 'production';

  require(`${ROOT}/environment.js`);
  require(`${ROOT}/server.js`);
  require(`${ROOT}/browser.js`);

  Server.init();
  Browser.init();
}
catch(error) {
  console.error('=== Error Booting Application ===');
  console.error(error);
  Electron.app.exit();
}
