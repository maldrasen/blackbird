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

    // TODO: A command with an overlay can't answer isPossible() by building its ability, because there's no data to
    //       build from until the overlay has chosen. We need to know if it's possible to cast any spell before we show
    //       the command that opens the spell selection UI. Those commands will a bespoke isPossible() that checks to
    //       see if a player has the spell, has enough mana to cast it, has a valid target, etc.

    function isPossible() {
      if (command.isPossible) { return command.isPossible(); }
      return command.buildAbility ? getAbility().isPossible() : true;
    }

    // A command with no overlay has nothing to choose, so its ability is built once and shared the way a monster
    // type's abilities are. The abilities read everything from the round when they run, so a shared model is safe. A
    // command with an overlay builds from what the overlay picked. The shared model is kept on the registered record
    // rather than the clone lookup() hands out.
    function getAbility(data={}) {
      if (command.buildAbility == null) { throw new Error(`The [${code}] command doesn't build an ability.`); }
      if (command.overlay) { return command.buildAbility(data); }
      return commands[code].ability ||= command.buildAbility();
    }

    // A command needs a target picked when the ability it would build does.
    function getTargetingMode(data={}) {
      return command.buildAbility ? getAbility(data).getTargetingMode() : null;
    }

    // Executing a command ends the character's round, whether it built an ability or ran the placeholder of a
    // command still waiting on its overlay.
    function execute(data={}) {
      command.buildAbility ? getAbility(data).execute() : command.execute();
      BattleSystem.finishCharacterRound();
    }

    return {
      getCode: () => { return code; },
      getName: () => { return command.name; },
      getCategory: () => { return command.category; },
      hasOverlay: () => { return typeof command.overlay === 'function'; },
      openOverlay: () => { command.overlay(); },
      isPossible,
      getAbility,
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
