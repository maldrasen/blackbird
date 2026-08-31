global.BattleRound = function(acting, type=null) {

  const state = BattleSystem.getState();
  const roundType = type || (state.isMonster(acting) ? 'monster' : 'character');
  const actingPosition = state.getPosition(acting);

  Validate.isIn('BattleRound.type', roundType, ['monster','character','status']);

  const messages = [];
  const context = {};

  let primaryWeapon = {};
  let secondaryWeapon = {};
  let target;
  let targetPosition;
  let time = 0;
  let ability;
  let abilityEntry;

  function getActingMonster() { return Monster(acting); }
  function getActingCharacter() { return Character(acting); }
  function getActingPosition() { return actingPosition; }
  function isActingMonster() { return roundType === 'monster'; }
  function isActingCharacter() { return roundType === 'character'; }
  function isStatusEffect() { return roundType === 'status'; }

  // A monster's ability entry is set alongside the code, so that an ability carrying extra data (the spell a
  // monster-cast-spell entry casts) can read the entry that was actually picked rather than looking it up by code.
  function setAbility(code, entry=null) {
    if (ability != null && ability !== code) {
      throw new Error(`Ability has already been set to ${ability}`);
    }
    ability = code;
    abilityEntry = entry;
  }

  // Cooldowns are keyed by the executing entry's key so that two entries sharing an ability code cool down
  // independently. An ability executed without an entry falls back to its code, which is what a keyless entry's key
  // would be anyway.
  function abilityKey(code) {
    return abilityEntry ? abilityEntry.key : code;
  }

  // Get the cooldown for the specified ability for the currently acting entity.
  function getCooldown(code) {
    if (isActingMonster()) { return getActingMonster().getAbilityCooldown(abilityKey(code)); }
    throw `Only monster abilities have cooldowns.`;
  }

  // Apply the cooldown time for the specified ability for the currently acting entity.
  function applyCooldown(code) {
    if (isActingMonster()) {
      const cooldown = getCooldown(code)
      if (cooldown) {
        BattleSystem.getState().setCooldown(acting, abilityKey(code), cooldown);
      }
    }
  }

  // Every weapon is a real weapon now, so any entity, character or monster, reads them from the equipment manager,
  // distilled down to the properties we need to make an attack roll or use in a physical ability. An entity with
  // nothing in hand ends up with null weapons - they fight with natural attack abilities (punch, bite) instead.

  function compileWeaponData() {
    if (EquipmentComponent.lookup(acting) != null) {
      const equipment = EquipmentManager(acting);
      const main = equipment.getSlot(EquipmentSlot.primary);
      const off = equipment.getSlot(EquipmentSlot.secondary);

      if (main && WeaponComponent.lookup(main)) { primaryWeapon = distillWeapon(main); }
      if (off && WeaponComponent.lookup(off)) { secondaryWeapon = distillWeapon(off); }
    }

    if (primaryWeapon.base == null) { primaryWeapon = null; }
    if (secondaryWeapon.base == null) { secondaryWeapon = null; }
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

  // Beasts don't have the body components speed is calculated from, so they use the flat factor from their base
  // monster record instead.
  function getSpeedFactor() {
    if (ActorComponent.lookup(acting).species) { return SpeedMath.calculateSpeedFactor(acting); }
    return Monster(acting).getBaseMonster().getSpeedFactor();
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

  return {
    getActing: () => { return acting; },
    getActingMonster,
    getActingCharacter,
    getActingPosition,
    isActingMonster,
    isActingCharacter,
    isStatusEffect,
    setAbility,
    getAbility: () => { return ability; },
    getAbilityEntry: () => { return abilityEntry; },
    getCooldown,
    applyCooldown,

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
  };

}
