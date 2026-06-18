global.BattleHelper = (function() {

  // Weapon Ranges
  //   Short:    Daggers and fists can only reach the character directly in front or diagonal.
  //   Close:    Swords, axes, maces, etc. can hit the front rank from the front, in front or two positions away.
  //   Extended: Polearms can hit the back rank from the front, the front from the back, in any position.
  //   Long:     Bows can hit any position.
  function isAttackWithinRange(reach, p1, p2) {
    const distance = distanceBetweenPositions(p1, p2);

    switch (reach) {
      case WeaponReach.short: return distance.rank === 0 && distance.position <= 1;
      case WeaponReach.close: return distance.rank === 0 && distance.position <= 2;
      case WeaponReach.extended: return distance.rank <= 1;
      case WeaponReach.long: return true;
      default: throw new Error(`Bad reach value [${reach}]`);
    }
  }

  function parsePosition(position) {
    const match = _positionPattern.match(position);
    if (match) {
      return { side:match[1], rank:match[2], position:match[3] };
    }
    throw new Error(`Invalid Position: ${position}`);
  }

  // Distance between positions returns an object with both rank difference and position difference as the rank
  // (vertical) distance is usually more significant than the position (horizontal) distance.
  function distanceBetweenPositions(p1, p2) {
    const m1 = p1.match(_positionPattern);
    const m2 = p2.match(_positionPattern);

    if (m1[1] !== m2[1]) {
      return {
        rank: parseInt(m1[2]) + parseInt(m2[2]),
        position: Math.abs(parseInt(m1[3]) - parseInt(m2[3])),
      }
    }

    throw new Error(`TODO: Distance between positions on same side.`);
  }

  // Determining the weapons that a monster or a character has equipped takes a little work, as they're both managed in
  // completely different ways. The basic monster attacks, as defined on the base monster, will usually include a base
  // weapon and a name. They can also define main and off-hand weapons.
  //
  //     Single:  { base:B, name:N, textKey:K }
  //     Dual:    { main:{ base:B, name:N, textKey:K }, off:{ base:B, name:N, textKey:K }}
  //
  // The weapon data for normal characters is found in the Equipment manager. In either case we distill the weapon data
  // down to the properties we need to make the attack roll.

  function compileWeaponData(id) {
    const state = BattleSystem.getState();
    const primaryWeapon = {};
    const secondaryWeapon = {};

    if (state.isMonster(id)) {
      const monsterAttack = Monster(id).getBasicAttack();
      if (monsterAttack.main) {
        const base = BaseWeapon.lookup(monsterAttack.main.base);
        primaryWeapon.base = monsterAttack.main.base;
        primaryWeapon.name = monsterAttack.main.name || base.getName();
        primaryWeapon.textKey = monsterAttack.main.textKey || base.getTextKey();
      }
      if (monsterAttack.off) {
        const base = BaseWeapon.lookup(monsterAttack.off.base);
        secondaryWeapon.base = monsterAttack.off.base;
        secondaryWeapon.name = monsterAttack.off.name || base.getName();
        secondaryWeapon.textKey = monsterAttack.off.textKey || base.getTextKey()
      }
      if (monsterAttack.base) {
        const base = BaseWeapon.lookup(monsterAttack.base);
        primaryWeapon.base = monsterAttack.base;
        primaryWeapon.name = monsterAttack.name || base.getName();
        primaryWeapon.textKey = monsterAttack.textKey || base.getTextKey();
      }
    }

    if (state.isCharacter(id)) {
      const equipment = EquipmentManager(id);
      const main = equipment.getSlot(EquipmentSlot.primary);
      const off = equipment.getSlot(EquipmentSlot.secondary);

      if (main && WeaponComponent.lookup(main)) {
        const mainWeapon = Weapon(main);
        primaryWeapon.base = mainWeapon.getBaseWeapon().getCode();
        primaryWeapon.name = mainWeapon.getName();
        primaryWeapon.textKey = mainWeapon.getTextKey();
      }
      if (off && WeaponComponent.lookup(off)) {
        const offWeapon = Weapon(off);
        secondaryWeapon.base = offWeapon.getBaseWeapon().getCode();
        secondaryWeapon.name = offWeapon.getName();
        secondaryWeapon.textKey = offWeapon.getTextKey();
      }
    }

    return {
      primary: primaryWeapon.base ? primaryWeapon : null,
      secondary: secondaryWeapon.base ? secondaryWeapon : null,
    }
  }

  function randomHitLocation() {
    return Random.fromFrequencyMap({
      chest: 35,
      feet:  15,
      hands: 15,
      head:  10,
      legs:  25,
    });
  }

  // I'll be logging the roll values every time we make a skill check from the various roll classes (PhysicalAttackRoll,
  // DefendRoll, etc.) This function takes all the skill check variables and flattens them in a format for the log.
  function compileSkillCheckRollData(skill, check, mode=RollMode.normal) {
    const data = { skill, value:check.value, type:'normal', mode };
    if (data.crit) { data.type='crit'; }
    if (data.fumble) { data.type='fumble'; }
    return data;
  }

  return Object.freeze({
    isAttackWithinRange,
    parsePosition,
    distanceBetweenPositions,
    compileWeaponData,
    randomHitLocation,
    compileSkillCheckRollData,
  });

})();