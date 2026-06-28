global.BattleRound = function(acting) {

  const state = BattleSystem.getState();
  const actingIsMonster = state.isMonster(acting);
  const actingPosition = state.getPosition(acting);
  const messages = [];
  const context = {};

  let primaryWeapon = {};
  let secondaryWeapon = {};
  let target;
  let targetPosition;
  let time = 0;
  let ability;

  function setAbility(code) {
    if (ability != null && ability !== code) {
      throw new Error(`Ability has already been set to ${ability}`);
    }
    ability = code;
  }

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
        primaryWeapon.reach = base.getReach();
        primaryWeapon.name = monsterAttack.main.name || base.getName();
        primaryWeapon.textKey = monsterAttack.main.textKey || base.getTextKey();
      }
      if (monsterAttack.off) {
        const base = BaseWeapon.lookup(monsterAttack.off.base);
        secondaryWeapon.base = monsterAttack.off.base;
        secondaryWeapon.reach = base.getReach();
        secondaryWeapon.name = monsterAttack.off.name || base.getName();
        secondaryWeapon.textKey = monsterAttack.off.textKey || base.getTextKey()
      }
      if (monsterAttack.base) {
        const base = BaseWeapon.lookup(monsterAttack.base);
        primaryWeapon.base = monsterAttack.base;
        primaryWeapon.reach = base.getReach();
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
        primaryWeapon.id = main;
        primaryWeapon.base = mainWeapon.getBaseWeapon().getCode();
        primaryWeapon.reach = mainWeapon.getBaseWeapon().getReach();
        primaryWeapon.name = mainWeapon.getName();
        primaryWeapon.textKey = mainWeapon.getTextKey();
      }
      if (off && WeaponComponent.lookup(off)) {
        const offWeapon = Weapon(off);
        secondaryWeapon.id = off;
        secondaryWeapon.base = offWeapon.getBaseWeapon().getCode();
        secondaryWeapon.reach = offWeapon.getBaseWeapon().getReach();
        secondaryWeapon.name = offWeapon.getName();
        secondaryWeapon.textKey = offWeapon.getTextKey();
      }
    }

    if (primaryWeapon.base == null) { primaryWeapon = null; }
    if (secondaryWeapon.base == null) { secondaryWeapon = null; }
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

  function addToContext(key, value) {
    if (key === 'A') { throw new Error(`Blasphemous Key: The acting entity is automatically included in the round context.`) }
    if (key === 'T') { throw new Error(`Blasphemous Key: The target entity set with the setTarget() function.`) }
    context[key] = value;
  }

  function getContext() {
    return { ...context, A:acting, T:target };
  }

  function addMessage(message, weaver=null) {
    if (weaver == null) {
      weaver = Weaver(getContext());
    }
    message.text = weaver.weave(message.text);
    messages.push(message);
  }

  // ==========
  //    Time
  // ==========

  function getSpeedFactor() {
    return CacheComponent.lookup(acting).speedFactor;
  }

  // When the action time is set we usually want to apply the standard time scale. Sometimes though (as in the case of
  // the basic attack) we've already applied the scale to calculate the number of attacks, so we don't want the scale
  // applied twice.
  function addTime(t, applySpeed=true) {
    time += Math.ceil(applySpeed ? (getSpeedFactor() * t) : t);
  }

  // Each round will need to take some time in order for the battle turns to advance.
  function validate() {
    if (time === 0) {
      throw new Error(`BattleRound.time was not set by the ${ability} ability.`)
    }
  }

  return Object.freeze({
    getActing: () => { return acting; },
    getActingMonster: () => { return Monster(acting); },
    getActingCharacter: () => { return Character(acting); },
    getActingPosition: () => { return actingPosition; },
    isActingMonster: () => { return actingIsMonster; },
    isActingCharacter: () => { return actingIsMonster === false; },
    setAbility,
    getAbility: () => { return ability; },

    compileWeaponData,
    getPrimaryWeapon: () => { return primaryWeapon; },
    getSecondaryWeapon: () => { return secondaryWeapon; },

    setTarget,
    setTargetPosition,
    clearTarget,
    getTarget: () => { return target; },
    getTargetPosition: () => { return targetPosition; },

    addToContext,
    getContext,
    addMessage,
    getMessages: () => { return messages; },

    getSpeedFactor,
    addTime,
    getTime: () => { return time; },
    validate,
  });

}
