
// This shim is only loaded when the app is served by the local webserver, in the browser.html. It adds browser
// stand-ins for the globals that Electron normally provides from Node. The shim is blacklisted in the manifest so the
// Electron and headless builds never see it. Anything written (or read back) under the DATA path is persisted to
// localStorage instead of disk.

window.IS_BROWSER = true;
window.global = window;
window.HEADLESS = false;
window.ROOT = location.origin;
window.DATA = 'blackbird-browser';

window.Environment = {
  name: 'development',
  isDevelopment: true,
  isProduction: false,
  isMac: navigator.platform.startsWith('Mac'),
  isWindows: navigator.platform.startsWith('Win'),
  isLinux: navigator.platform.startsWith('Linux'),
};

window.fs = (function() {

  function isDataPath(path) { return path.startsWith(DATA); }

  function readFileSync(path) {
    if (isDataPath(path)) { return localStorage.getItem(path); }

    const request = new XMLHttpRequest();
    request.open('GET', path, false);
    request.send();

    if (request.status !== 200) { throw new Error(`GET ${path} returned ${request.status}`); }
    return request.responseText;
  }

  function readFile(path, callback) {
    if (isDataPath(path)) { return callback(null, localStorage.getItem(path)); }

    fetch(path).then(response => {
      if (response.ok === false) { throw new Error(`GET ${path} returned ${response.status}`); }
      return response.text();
    }).then(text => callback(null, text)).catch(error => callback(error));
  }

  function writeFile(path, data, callback) {
    localStorage.setItem(path, data);
    callback(null);
  }

  function existsSync(path) {
    return localStorage.getItem(path) !== null;
  }

  function exists(path, callback) {
    callback(existsSync(path));
  }

  return Object.freeze({
    readFileSync,
    readFile,
    writeFile,
    existsSync,
    exists,
  });

})();
