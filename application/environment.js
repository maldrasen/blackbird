const os = require('os');

global.Environment = (function() {
  function getName() { return ENVIRONMENT; }
  function isDevelopment() { return ENVIRONMENT === 'development' }
  function isProduction() { return ENVIRONMENT === 'production' }

  // The environment object we send to the client. The client always has a view, while the Node side object below is
  // what headless scripts and the test runner see, so only the packed object reports a view present.
  function pack() {
    return {
      name: ENVIRONMENT,
      version: VERSION,
      isDevelopment: isDevelopment(),
      isProduction: isProduction(),
      isMac: (os.platform() === "darwin"),
      isWindows: (os.platform() === "win32"),
      isLinux: (os.platform() === "linux"),
      viewPresent: true,
    };
  }

  return {
    getName,
    isDevelopment,
    isProduction,
    pack,
    viewPresent: false,
  };

})();
