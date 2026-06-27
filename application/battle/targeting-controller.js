global.TargetingController = (function() {

  function startBasicAttackTargeting() {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();

    const monsters = getMonstersInRange().filter(m => {
      return state.hasStatusEffect(m.monster, 'hidden') === false;
    });

    const positions = monsters.map(mon => mon.position);
    FormationPanel.startTargeting(positions, [], position => {
      const id = state.getEntityAtPosition(position)

      round.setTarget(id);

      BasicAttack.execute();
    });
  }

  // Sneak attack can target any monster.
  function startSneakAttack() {
    FormationPanel.startTargeting(getTargetableMonsters(), [], position => {
      BattleSystem.getRound().setTarget(BattleSystem.getState().getEntityAtPosition(position));
      SneakAttack.execute();
    });
  }

  function getTargetableMonsters() {
    const state = BattleSystem.getState();
    const monsters = [];

    state.getMonsters().forEach(monster => {
      if (state.canBeTargeted(monster)) {
        monsters.push(state.getPosition(monster));
      }
    });

    return monsters;
  }

  function getMonstersInRange() {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const reach = getBasicAttackReach(acting); // TODO: Move reach into round data...
    const position = round.getActingPosition();

    const inRange = [];

    state.getMonsters().forEach(monster => {
      if (state.canBeTargeted(monster)) {
        const monsterPosition = state.getPosition(monster)
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
    startSneakAttack,
    startBasicAttackTargeting,
  });

})()