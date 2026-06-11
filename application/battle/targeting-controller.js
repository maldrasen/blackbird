global.TargetingController = (function() {

  function startBasicAttackTargeting() {
    const state = BattleSystem.getState()
    const monsters = getMonstersInRange();
    const positions = monsters.map(mon => mon.position);
    FormationPanel.startTargeting(positions, [], position => {
      BattleSystem.finishCharacterTurn(BasicAttack.execute(
        state.getActingCharacter(),
        state.getMonsterAtPosition(position)
      ));
    });
  }

  function getMonstersInRange() {
    const state = BattleSystem.getState();
    const acting = state.getActingCharacter();
    const reach = getBasicAttackReach(acting);
    const position = state.getPositionOf(acting)
    const inRange = [];

    state.getMonsters().forEach(monster => {
      if (state.isAlive(monster)) {
        const monsterPosition = state.getPositionOf(monster)
        if (BattleHelper.isAttackWithinRange(reach, position, monsterPosition)) {
          inRange.push({ monster:monster, position:monsterPosition });
        }
      }
    });

    return inRange;
  }

  // If a character doesn't have a weapon equipped then they are attacking with their fists, which has a close range.
  function getBasicAttackReach(id) {
    const weaponId = EquipmentManager(id).getSlot(EquipmentSlot.primary);
    return (weaponId == null) ? WeaponReach.close : Weapon(weaponId).getBaseWeapon().getReach();
  }

  return Object.freeze({
    getMonstersInRange,
    startBasicAttackTargeting,
  });

})()