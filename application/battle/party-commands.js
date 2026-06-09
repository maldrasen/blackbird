global.PartyCommands = (function() {

  function showCommands(id) {
    const commands = [];
    commands.push({ ability:'basic-attack', name:'Attack' });

    BattleView.showCommands(commands)
  }

  return Object.freeze({
    showCommands
  })

})();
