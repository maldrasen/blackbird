// A battle command is what a character picks from the command panel. Most commands stand for an ability and build
// it when used, from whatever their overlay chose (a spell and power level, an item). A command with a check of its
// own, like negotiate, answers for itself.
global.BattleCommand = (function() {
  const commands = {};

  function register(code,data) {
    commands[code] = data;
  }

  function getAllCodes() {
    return Object.keys(commands);
  }

  function lookup(code) {
    if (commands[code] == null) { throw new Error(`Bad battle command code [${code}]`); }

    const command = { ...commands[code] };

    // TODO: This will need to be handled differently for the commands that require options like cast spell or use
    //       item. We need to know if it's possible to cast any spell before we show the command to open the spell
    //       selection UI, but we won't have any spell data until a spell is selected in that UI. Building an ability
    //       every time this is checked also burns an ability ID every round for each command. We may need to make the
    //       isPossible() function "static" to the factory.

    function isPossible() {
      if (command.isPossible) { return command.isPossible(); }
      return command.buildAbility ? buildAbility().isPossible() : true;
    }

    function buildAbility(data={}) {
      if (command.buildAbility == null) { throw new Error(`The [${code}] command doesn't build an ability.`); }
      return command.buildAbility(data);
    }

    // TODO: It's also a problem that we're building the ability 4 times every character click. getCommands,
    //       getTargetingMode, startTargeting, and execute each build the ability again. This is looking like some of
    //       the properties held by the ability should really belong to the command, but then commands are only used
    //       by the characters. If we pull the command specific properties out of the abilities then monsters would
    //       then need to use these commands or have their own equivalent record. This is kind of harmless for now
    //       though. Building an ability has the side effect of incrementing the ability ID, but I don't think I really
    //       need to worry about running out of integers.

    // A command needs a target picked when the ability it would build does.
    function getTargetingMode(data={}) {
      return command.buildAbility ? buildAbility(data).getTargetingMode() : null;
    }

    // Executing a command ends the character's round, whether it built an ability or ran the placeholder of a
    // command still waiting on its overlay.
    function execute(data={}) {
      command.buildAbility ? buildAbility(data).execute() : command.execute();
      BattleSystem.finishCharacterRound();
    }

    return {
      getCode: () => { return code; },
      getName: () => { return command.name; },
      getCategory: () => { return command.category; },
      hasOverlay: () => { return typeof command.overlay === 'function'; },
      openOverlay: () => { command.overlay(); },
      isPossible,
      buildAbility,
      getTargetingMode,
      execute,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
