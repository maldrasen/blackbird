global.ConsoleView = (function() {

  const entryLimit = 1000;

  function init() {
    window.addEventListener('keydown', event => {
      if (event.code === KeyCodes.Backquote) {
        event.stopPropagation();
        event.preventDefault();
        toggleConsole();
      }
    })

    X.onClick('#console .entity-link', event => {
      const id = event.target.closest('.entity-link').dataset.entityId;
      ConsoleCommands.run(`entityData ${id}`);
    });

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

    const container = logContainer();
    container.scrollTop = container.scrollHeight;
  }

  function hide() {
    X.addClass('#console','hide');
  }

  function clear() {
    X.empty('#consoleLog');
  }

  function logContainer() {
    return X.first('#console .console-log-container');
  }

  function isVisible() { return !X.hasClass('#console','hide'); }

  function append(logData) {
    trimEntries()

    const entryElement = X.createElement(`<li class='entry type-${logData.type}'>
      <span class='time'>${logData.time}</span>
    </li>`)

    addSegment(entryElement, 'system', logData.system);
    addSegment(entryElement, 'message', logData.message);
    addDataSegment(entryElement, logData.data);

    X.addClass(entryElement, `level-${logData.level || 2}`)

    // Stay pinned to the bottom when the newest entries were already visible.
    const container = logContainer();
    const pinned = container.scrollTop + container.clientHeight >= container.scrollHeight - 5;

    X.first('#consoleLog').appendChild(entryElement);

    if (pinned) { container.scrollTop = container.scrollHeight; }
    if (logData.type === LogType.error) { Alert.showFromLog(logData); }
  }

  function trimEntries() {
    if (X.first('#consoleLog').querySelectorAll('.entry').length > entryLimit) {
      X.first('#consoleLog .entry').remove();
    }
  }

  function addSegment(element, classname, content) {
    if (content) {
      element.appendChild(X.createElement(`<span class='${classname}'>${linkifyEntityIds(content)}</span>`));
    }
  }

  function addDataSegment(element, data) {
    if (data) {
      if (typeof data !== 'string') { data = JSON.stringify(data,null,1) }
      element.appendChild(X.createElement(`<span class='data'> ${linkifyEntityIds(data)}</span>`));
    }
  }

  // Anything in a log message that looks like an entity id becomes a link that prints that entity's data.
  function linkifyEntityIds(text) {
    return `${text}`.replace(/∈[0-9A-Z]{5,8}/g, id => {
      if (Registry.entityExists(id) === false) { return id; }
      return `<a class='entity-link' data-entity-id='${id}'>${id}</a>`;
    });
  }

  return {
    init,
    hide,
    clear,
    isVisible,
    append,
  };

})();
