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

  // Any entity with real weapons equipped, character or monster, reads them from the equipment manager. A monster
  // with an empty primary hand falls back to the basic attack defined on its base monster, which will usually
  // include a base weapon and a name. It can also define main and off-hand attacks.
  //
  //     Single:  { base:B, name:N, textKey:K }
  //     Dual:    { main:{ base:B, name:N, textKey:K }, off:{ base:B, name:N, textKey:K }}
  //
  // In either case we distill the weapon data down to the properties we need to make an attack roll or use in a
  // physical ability. A monster that carries a shield but fights with a natural attack ends up with an equipped
  // secondary and a basic attack primary.

  function compileWeaponData() {
    compileFromEquipment();
    if (actingIsMonster && primaryWeapon.base == null) { compileFromBasicAttack(); }

    if (primaryWeapon.base == null) { primaryWeapon = null; }
    if (secondaryWeapon.base == null) { secondaryWeapon = null; }
  }

  function compileFromEquipment() {
    if (EquipmentComponent.lookup(acting) == null) { return; }

    const equipment = EquipmentManager(acting);
    const main = equipment.getSlot(EquipmentSlot.primary);
    const off = equipment.getSlot(EquipmentSlot.secondary);

    if (main && WeaponComponent.lookup(main)) { primaryWeapon = distillWeapon(main); }
    if (off && WeaponComponent.lookup(off)) { secondaryWeapon = distillWeapon(off); }
  }

  // TODO: I'd like to take a closer look at this function. When we moved to monsters using real equipment this was
  //       left in place because monsters that use natural attacks (fists, claws, teeth, etc) would still need a way
  //       to define their basic attack data. The shape of this still reads like it should hold weapon data though
  //       which should no longer be the case. However before I can dive into how natural weapons are defined, I need
  //       some more "animal" type monsters. I don't think that a beast with bite and claw attacks will look the same
  //       as a kobold with a main and off hand weapon.

  function compileFromBasicAttack() {
    const monsterAttack = Monster(acting).getBasicAttack();
    if (monsterAttack == null) { return; }

    if (monsterAttack.main) { primaryWeapon = distillAttack(monsterAttack.main); }
    if (monsterAttack.base) { primaryWeapon = distillAttack(monsterAttack); }
    if (monsterAttack.off && secondaryWeapon.base == null) { secondaryWeapon = distillAttack(monsterAttack.off); }
  }

  function distillWeapon(itemId) {
    const weapon = Weapon(itemId);
    const baseWeapon = weapon.getBaseWeapon();
    return {
      id: itemId,
      base: baseWeapon.getCode(),
      reach: baseWeapon.getReach(),
      name: weapon.getName(),
      textKey: weapon.getTextKey(),
    };
  }

  function distillAttack(attack) {
    const base = BaseWeapon.lookup(attack.base);
    return {
      base: attack.base,
      reach: base.getReach(),
      name: attack.name || base.getName(),
      textKey: attack.textKey || base.getTextKey(),
    };
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
