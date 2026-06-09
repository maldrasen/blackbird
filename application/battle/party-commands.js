global.PartyCommands = (function() {

  // TODO: Only show basic attack if a monster is in range.
  function showCommands() {
    const commands = [];
    commands.push({ command:BattleCommand.basicAttack, name:'Attack' });
    commands.push({ command:BattleCommand.changeEquipment, name:'Change Equipment', layout:'utility' });
    commands.push({ command:BattleCommand.useItem, name:'Use Item', layout:'utility' });
    CommandPanel.showCommands(commands);
  }

  return Object.freeze({
    showCommands
  })

})();
