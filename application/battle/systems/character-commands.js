global.CharacterCommands = (function() {

  function getCommands() {
    const acting = BattleSystem.getRound().getActing();
    const situation = getSituation(acting);
    const commands = [];

    if (canAct(acting)) {
      if (canBasicAttack(situation)) { commands.push({ command:BattleCommand.basicAttack, name:'Attack' }); }
      if (canHide(situation)) { commands.push({ command:BattleCommand.hide, name:'Hide' }); }
      if (situation.isHidden) { commands.push({ command:BattleCommand.sneakAttack, name:'Sneak Attack' }); }

      commands.push({ command:BattleCommand.basicDefend, name:'Defend' });
      commands.push({ command:BattleCommand.changeEquipment, name:'Change Equipment', layout:'utility' });
      commands.push({ command:BattleCommand.useItem, name:'Use Item', layout:'utility' });
    }
    if (commands.length === 0) {
      commands.push({ command:BattleCommand.pass, name:'Pass' });
    }

    return commands;
  }

  function canAct(acting) {
    return BattleSystem.getState().hasStatusEffect(acting,'stun') === false;
  }

  function canBasicAttack(situation) { return situation.monstersAreInRange && situation.isNotHidden; }
  function canHide(situation) { return situation.isNotHidden && situation.isInBack && situation.hasHideSkill; }

  function getSituation(acting) {
    const state = BattleSystem.getState();
    const skills = SkillsComponent.lookup(acting);

    const situation = {
      state: state,
      isHidden: state.hasStatusEffect(acting,'hidden'),
      isInFront: BattleSystem.getState().isInFront(acting),
      monstersInRange: TargetingController.getMonstersInRange(),
      hasHideSkill: skills.stealth > 0,
    }

    situation.isNotHidden = situation.isHidden === false;
    situation.isInBack = situation.isInFront === false;
    situation.monstersAreInRange = situation.monstersInRange.length > 0;

    return situation;
  }

  return Object.freeze({
    getCommands,
    getSituation,
  })

})();
