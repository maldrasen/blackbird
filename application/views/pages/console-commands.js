global.ConsoleCommands = (function() {

  const $commands = {
    help: {
      commandFunction: printHelp,
      description:`Prints this list of console commands.` },
  }

  const $commandHistory = [];
  let $commandHistoryPointer;

  function sendCommand(input) {
    const command = input.value;
    if (command.length) {
      input.value = '';
      try {
        executeCommand(command);
      }
      catch (error) {
        logError(`Error running command`,error,{ system:'Console' });
      }
      $commandHistory.push(command);
      $commandHistoryPointer = null;
    }
  }

  function loadPreviousCommand() {
    if ($commandHistoryPointer == null) {
      $commandHistoryPointer = $commandHistory.length;
    }
    $commandHistoryPointer -= 1;

    if ($commandHistoryPointer >= 0) {
      const command = $commandHistory[$commandHistoryPointer];
      if (command) {
        const input = X.first('#commandInput');
        input.value = command;
        setTimeout(() => {
          input.selectionStart = command.length;
          input.selectionEnd = command.length;
        },0);
      }
    }

    if ($commandHistoryPointer === 0) {
      $commandHistoryPointer = null;
    }
  }

  function executeCommand(commandString) {
    const args = commandString.split(" ");
    const command = $commands[args[0]];
    args.shift();

    if (command == null) {
      throw `Unrecognized Command: ${commandString}. Type 'help' for a list of commands.`
    }

    const valid = meetsRequirements(command);
    if (valid === true) {
      return log(command.commandFunction(args) || 'Success',{ system:"Console" });
    }

    log(`Invalid Command: ${valid}`, { system:'Console', type:LogType.warning })
  }

  function meetsRequirements(command) {
    if (command.requires) {
      for (const requirement of command.requires) {
        switch (requirement) {
          case 'game.loaded':
            if (!GameState.isLoaded()) { return `A Game must be loaded.`; }
            break;
          default: throw `Bad Requirement ${requirement}`
        }
      }
    }
    return true;
  }

  function printHelp() {
    let list = `<pre class='padding'>\n=== Console Help ===\n`;
    Object.keys($commands).forEach(name => {
      list += `${StringHelper.pad(name,12)} ${$commands[name].description}\n`
    });
    return `${list}</pre>`;
  }

  return {
    sendCommand,
    loadPreviousCommand,
  }

})();
