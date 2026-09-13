global.BattleCommand = (function() {
  const commands = {};

  function register(code,data) {
    commands[code] = data;
  }

  function getAllCodes() {
    return Object.keys(commands);
  }

  function lookup(code) {
    if (commands[code] == null) { throw new Error(`Bad cohort code [${code}]`); }

    const command = { ...commands[code] };

    return {
      getCode: () => { return code; },
      getName: () => { return command.name },

      getCategory: () => { return command.category },
      hasOverlay: () => { return typeof command.overlay === 'function' },
      openOverlay: () => { command.overlay() },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
