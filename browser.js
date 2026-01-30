global.Browser = (function() {
  let $mainWindow;

  function init() {
    Electron.app.whenReady().then(createWindow);
    Electron.app.on('window-all-closed', Electron.app.quit);
    Electron.app.on('activate', activate);
  }

  function createWindow() {
    $mainWindow = new Electron.BrowserWindow({
      title: 'Blackbird',
      icon: `${ROOT}/assets/icon.png`,
      width: 1920,
      height: 1080,
      minWidth: 1280,
      minHeight: 720,

      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        sandbox: false,
      },
    });

    $mainWindow.loadURL(`file://${ROOT}/views/loading.html`);

    if (Environment.isDevelopment()) {
      $mainWindow.webContents.openDevTools();
    }

    $mainWindow.setMenu(null);

    $mainWindow.on('closed', () => {
      $mainWindow = null;
      Electron.app.quit();
    });
  }

  // Mac specific window handling.
  function activate() {
    if ($mainWindow === null) { createWindow(); }
  }

  // Send a message to the client. The content of the message will be
  // serialized to JSON.
  function send(message, content) {
    if ($mainWindow && $mainWindow.webContents) {
      $mainWindow.webContents.send(message, content);
    }
  }

  // Respond to a message sent by the client. The message parameter is just a
  // string used to match a message name to a callback.
  function receive(message, callback) {
    Electron.ipcMain.handle(message, callback);
  }

  return {
    init,
    send,
    receive,
  };
})();
