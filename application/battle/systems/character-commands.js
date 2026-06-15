global.CharacterCommands = (function() {

  // TODO: Only show basic attack if a monster is in range.
  function getCommands() {
    const commands = [];
    commands.push({ command:BattleCommand.basicAttack, name:'Attack' });
    commands.push({ command:BattleCommand.basicDefend, name:'Defend' });
    commands.push({ command:BattleCommand.changeEquipment, name:'Change Equipment', layout:'utility' });
    commands.push({ command:BattleCommand.useItem, name:'Use Item', layout:'utility' });
    return commands;
  }

  return Object.freeze({
    getCommands
  })

})();
