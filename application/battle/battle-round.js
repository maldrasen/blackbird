global.BattleRound = function(acting) {

  const state = BattleSystem.getState();
  const actingIsMonster = state.isMonster(acting);
  const actingPosition = state.getPosition(acting);
  const messages = [];

  let primaryWeapon = {};
  let secondaryWeapon = {};
  let target;
  let targetPosition;
  let time;

  // Determining the weapons that the acting entity has equipped takes a little work, as they're both managed in
  // completely different ways. The basic monster attacks, as defined on the base monster, will usually include a base
  // weapon and a name. They can also define main and off-hand weapons.
  //
  //     Single:  { base:B, name:N, textKey:K }
  //     Dual:    { main:{ base:B, name:N, textKey:K }, off:{ base:B, name:N, textKey:K }}
  //
  // The weapon data for normal characters is found in the Equipment manager. In either case we distill the weapon data
  // down to the properties we need to make an attack roll or use in a physical ability.

  function compileWeaponData() {
    if (actingIsMonster) {
      const monsterAttack = Monster(acting).getBasicAttack();
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

    if (actingIsMonster === false) {
      const equipment = EquipmentManager(acting);
      const main = equipment.getSlot(EquipmentSlot.primary);
      const off = equipment.getSlot(EquipmentSlot.secondary);

      if (main && WeaponComponent.lookup(main)) {
        const mainWeapon = Weapon(main);
        primaryWeapon.weapon = main;
        primaryWeapon.base = mainWeapon.getBaseWeapon().getCode();
        primaryWeapon.name = mainWeapon.getName();
        primaryWeapon.textKey = mainWeapon.getTextKey();
      }
      if (off && WeaponComponent.lookup(off)) {
        const offWeapon = Weapon(off);
        secondaryWeapon.weapon = off;
        secondaryWeapon.base = offWeapon.getBaseWeapon().getCode();
        secondaryWeapon.name = offWeapon.getName();
        secondaryWeapon.textKey = offWeapon.getTextKey();
      }
    }

    if (primaryWeapon.base == null) { primaryWeapon = null; }
    if (secondaryWeapon.base == null) { secondaryWeapon = null; }
  }

  // TODO: We need to determine how the speed factor is calculated. It think we should only need this for the acting
  //       character. Speed effects how long actions take, but I don't think it effects anything else. If we want
  //       speed to give characters a bonus to evation or something we should add that to the haste status effect
  //       rather than tying it to the actual action speed.
  function getSpeedFactor() {
    return 1;
  }

  function setTarget(id) {
    target = id;
    targetPosition = state.getPosition(id);
  }

  // TODO: It's possible that an ability may target a position rather than a character. When we set the position we
  //       should look at the ability range and put together a list of characters that are inside the area of effect.
  function setTargetPosition(position, range) {
    targetPosition = position;
  }

  function clearTarget() {
    target = null;
    targetPosition = null;
  }

  // TODO: Weave the messages as they are added.
  function addMessage(message) {
    messages.push(message);
  }

  // When the action time is set we usually want to apply the standard time scale. Sometimes though (as in the case of
  // the basic attack) we've already applied the scale to calculate the number of attacks, so we don't want the scale
  // applied twice.
  function setTime(t, applySpeed=true) {
    time = applySpeed ? (getSpeedFactor() * t) : t;
  }

  // Each round will need to take some time in order for the battle turns to advance.
  function validate() {
    Validate.atLeast("BattleRound.time",time,1);
  }

  return Object.freeze({
    getActing: () => { return acting; },
    getActingMonster: () => { return Monster(acting); },
    getActingCharacter: () => { return Character(acting); },
    getActingPosition: () => { return actingPosition; },
    isActingMonster: () => { return actingIsMonster; },
    isActingCharacter: () => { return actingIsMonster === false; },

    compileWeaponData,
    getPrimaryWeapon: () => { return primaryWeapon; },
    getSecondaryWeapon: () => { return secondaryWeapon; },
    getSpeedFactor,

    setTarget,
    setTargetPosition,
    clearTarget,
    getTarget: () => { return target; },
    getTargetPosition: () => { return targetPosition; },

    addMessage,
    getMessages: () => { return messages; },

    setTime,
    getTime: () => { return time; },
    validate,
  });

}
