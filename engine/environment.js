const os = require('os');

global.Environment = (function() {

  function getName() { return ENVIRONMENT; }
  function isDevelopment() { return ENVIRONMENT === 'development' }
  function isProduction() { return ENVIRONMENT === 'production' }

  // The environment object we send to the client.
  function pack() {
    return {
      name: ENVIRONMENT,
      isDevelopment: isDevelopment(),
      isProduction: isProduction(),
      isMac: (os.platform() === "darwin"),
      isWindows: (os.platform() === "win32"),
      isLinux: (os.platform() === "linux"),
    };
  }

  return {
    getName,
    isDevelopment,
    isProduction,
    pack,
  }

})();

