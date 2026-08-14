global.Console = (function() {

  function log(message, options={}) {
    const type = options.type || LogType.info;

    if (Environment.viewPresent()) {
      options.time = TimeHelper.getTimeString();
      options.message = message;
      options.type = type;
      ConsoleView.append(options);
    }

    if (type === LogType.warning) { console.warn(message); }
    if (type === LogType.error) { console.error(message); }
  }

  function logError(message, error, options={}) {
    if (options.data == null) { options.data = {};}

    if (Environment.viewPresent() === false) {
      console.error('=== Error ===');
      console.error(message);
      if (error) { console.error(error); }
      if (Object.keys(options.data).length > 0) { console.error(JSON.stringify(options.data, null, 2)); }
      return;
    }

    options.level = 1;
    options.type = LogType.error;
    options.data.error = errorToString(error)

    log(message, options);

    console.error(message, options);
    if (error) { console.error(error); }
  }

  function errorToString(error) {
    return JSON.stringify(error, Object.getOwnPropertyNames(error))
  }

  return {
    log,
    logError,
  };

})();
