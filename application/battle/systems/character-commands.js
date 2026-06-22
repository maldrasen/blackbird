global.CharacterCommands = (function() {

  function getCommands() {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const monstersInRange = TargetingController.getMonstersInRange();
    const commands = [];

    if (monstersInRange.length > 0) { commands.push({ command:BattleCommand.basicAttack, name:'Attack' }); }
    if (canHide(acting)) { commands.push({ command:BattleCommand.hide, name:'Hide' }); }

    commands.push({ command:BattleCommand.basicDefend, name:'Defend' });
    commands.push({ command:BattleCommand.changeEquipment, name:'Change Equipment', layout:'utility' });
    commands.push({ command:BattleCommand.useItem, name:'Use Item', layout:'utility' });

    return commands;
  }

  function canHide(acting) {
    const state = BattleSystem.getState();
    const skills = SkillsComponent.lookup(acting);

    if (state.isInFront(acting)) { return false; }
    if (skills.stealth < 1) { return false; }

    return state.hasStatusEffect(acting,'hidden') === false;
  }

  return Object.freeze({
    getCommands
  })

})();
