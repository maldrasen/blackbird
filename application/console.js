global.Console = (function() {
  const listeners = [];

  function notify(entry) {
    listeners.forEach(listener => listener(entry));
  }

  function log(message, options={}) {
    const entry = { ...options, message, type:options.type || LogType.info };

    notify(entry);

    if (Environment.viewPresent()) {
      ConsoleView.append({ ...entry, time:TimeHelper.getTimeString() });
    }

    if (entry.type === LogType.warning) { console.warn(message); }
    if (entry.type === LogType.error) { console.error(message); }
  }

  function logError(message, error, options={}) {
    const data = { ...(options.data || {}) };
    if (error) { data.error = errorToString(error); }

    const entry = { ...options, data, level:1, type:LogType.error };

    if (Environment.viewPresent() === false) {
      notify({ ...entry, message });
      console.error('=== Error ===');
      console.error(message);
      if (error) { console.error(error); }
      if (options.data && Object.keys(options.data).length > 0) { console.error(JSON.stringify(options.data, null, 2)); }
      return;
    }

    log(message, entry);

    console.error(message, entry);
    if (error) { console.error(error); }
  }

  function errorToString(error) {
    return JSON.stringify(error, Object.getOwnPropertyNames(error))
  }

  return {
    addListener: listener => { listeners.push(listener); },
    log,
    logError,
  };

})();
