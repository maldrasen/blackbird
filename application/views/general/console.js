global.Console = (function() {

  const $entryLimit = 1000;

  let $scrollingPanel;

  // TODO: We can still consider adding autocomplete for some commands at some
  //       point. If we know we're starting an addItem command it might be
  //       nice to autocomplete the item code as it's being typed. Depends on
  //       how often I use this console I suppose.

  function init() {
    $scrollingPanel = ScrollingPanel({ id:'#consoleLog' });

    window.addEventListener('keydown', event => {
      if (event.code === KeyCodes.Backquote) {
        event.stopPropagation();
        event.preventDefault();
        toggleConsole();
      }
    })

    X.first('#commandInput').addEventListener('keydown', event => {
      event.stopPropagation();
      if (event.code === KeyCodes.Backquote) {
        event.preventDefault();
        toggleConsole();
      }
      if (event.code === KeyCodes.Escape) {
        toggleConsole();
      }
      if (event.code === KeyCodes.ArrowUp) {
        ConsoleCommands.loadPreviousCommand();
      }
      if (event.code === KeyCodes.Enter) {
        ConsoleCommands.sendCommand(event.target);
      }
    });
  }

  function toggleConsole() {
    if (isVisible()) { return hide(); }

    X.removeClass('#console','hide');
    X.first('#commandInput').focus();
    setTimeout(() => {
      $scrollingPanel.resize();
    },1);
  }

  function hide() {
    X.addClass('#console','hide');
  }

  function isVisible() { return !X.hasClass('#console','hide'); }

  // === Entry Elements ========================================================
  // We want this log() function to look just like the one in the Logger class
  // but delegate to the append() function so that log messages from the client
  // and the server and handled in the same way.
  function log(message, options={}) {
    if (Tests.running() === false) {
      options.time = TimeHelper.getTimeString();
      options.message = message;
      options.type = options.type || LogType.info;
      append(options);
    }
  }

  function logError(message, error, options={}) {
    if (options.data == null) { options.data = {};}

    if (Tests.running()) {
      console.error('=== Error ===');
      console.error(message);
      console.error(error);
      console.error(options);
      return;
    }

    options.level = 1;
    options.type = LogType.error;
    options.data.error = errorToString(error)

    log(message, options);

    console.error(message, options);
    console.error(error.stack);
  }

  function append(logData) {
    trimEntries()

    const entryElement = X.createElement(`<li class='entry type-${logData.type}'>
      <span class='time'>${logData.time}</span>
    </li>`)

    addSegment(entryElement, 'system', logData.system);
    addSegment(entryElement, 'message', logData.message);
    addDataSegment(entryElement, logData.data);

    X.addClass(entryElement, `level-${logData.level || 2}`)
    X.first('#consoleLog').appendChild(entryElement);

    if ($scrollingPanel) { $scrollingPanel.resize(); }

    if (Environment.isDevelopment) {
      if (logData.type === LogType.error || logData.type === LogType.warning) {
        Alert.showFromLog(logData)
      }
    }
  }

  function trimEntries() {
    if (X.first('#consoleLog').querySelectorAll('.entry').length > $entryLimit) {
      X.first('#consoleLog .entry').remove();
    }
  }

  function addSegment(element, classname, content) {
    if (content) {
      element.appendChild(X.createElement(`<span class='${classname}'>${content}</span>`));
    }
  }

  function addDataSegment(element, data) {
    if (data) {
      if (typeof data !== 'string') { data = JSON.stringify(data,null,1) }
      element.appendChild(X.createElement(`<span class='data'> ${data}</span>`));
    }
  }

  function errorToString(error) {
    return JSON.stringify(error, Object.getOwnPropertyNames(error))
  }

  return Object.freeze({
    init,
    hide,
    isVisible,
    append,
    log,
    logError,
  });

})();

/**
 * Print a message to the Blackbird console.
 *
 * ```
 * Log Options:
 *    system - Label for the system this message is from.
 *    type - A LogType (info, success, warning, error)
 *    level - Message importance (1,2,3)
 *    data - Object of data to include.
 * ```
 *
 * @param {string} message
 * @param {object} options
 */
window.log = Console.log;

/**
 * Print an error to the Blackbird console.
 *
 * ```
 * Log Options:
 *    system - Label for the system this message is from.
 *    type - A LogType (info, success, warning, error)
 *    level - Message importance (1,2,3)
 *    data - Object of data to include.
 * ```
 *
 * @param {string} message
 * @param {error} error
 * @param {object} options
 */
window.logError = Console.logError;
