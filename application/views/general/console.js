global.Console = (function() {

  const entryLimit = 1000;
  let scrollingPanel;

  function init() {
    scrollingPanel = ScrollingPanel({ id:'#consoleLog' });

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
      scrollingPanel.resize();
    },1);
  }

  function hide() {
    X.addClass('#console','hide');
  }

  function isVisible() { return !X.hasClass('#console','hide'); }

  function log(message, options={}) {
    const type = options.type || LogType.info;

    if (HEADLESS === false && Tests.running() === false) {
      options.time = TimeHelper.getTimeString();
      options.message = message;
      options.type = type;
      append(options);
    }

    if (type === LogType.warning) { console.warn(message); }
    if (type === LogType.error) { console.error(message); }
  }

  function logError(message, error, options={}) {
    if (options.data == null) { options.data = {};}

    if (HEADLESS || Tests.running()) {
      console.error('=== Error ===');
      console.error(message);
      console.error(JSON.stringify(error));
      console.error(JSON.stringify(options));
      return;
    }

    options.level = 1;
    options.type = LogType.error;
    options.data.error = errorToString(error)

    Console.log(message, options);

    console.error(message, options);
    if (error) { console.error(error); }
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

    if (scrollingPanel) { scrollingPanel.resize(); }
    if (logData.type === LogType.error) { Alert.showFromLog(logData); }
  }

  function trimEntries() {
    if (X.first('#consoleLog').querySelectorAll('.entry').length > entryLimit) {
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
