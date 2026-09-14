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

    function isPossible() {
      if (command.isPossible) { return command.isPossible(); }
      return command.buildAbility ? buildAbility().isPossible() : true;
    }

    function buildAbility(data={}) {
      if (command.buildAbility == null) { throw new Error(`The [${code}] command doesn't build an ability.`); }
      return command.buildAbility(data);
    }

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
