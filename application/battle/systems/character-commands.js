global.CharacterCommands = (function() {

  function getCommands() {
    const state = BattleSystem.getState();
    const character = Character(state.getActingCharacter());
    const isInFront = state.isInFront(character.getEntity());
    const monstersInRange = TargetingController.getMonstersInRange();
    const skills = SkillsComponent.lookup(character.getEntity());
    const commands = [];

    if (monstersInRange.length > 0) { commands.push({ command:BattleCommand.basicAttack, name:'Attack' }); }
    if (isInFront === false && skills.stealth > 0) { commands.push({ command:BattleCommand.hide, name:'Hide' }); }

    commands.push({ command:BattleCommand.basicDefend, name:'Defend' });
    commands.push({ command:BattleCommand.changeEquipment, name:'Change Equipment', layout:'utility' });
    commands.push({ command:BattleCommand.useItem, name:'Use Item', layout:'utility' });

    return commands;
  }

  return Object.freeze({
    getCommands
  })

})();
