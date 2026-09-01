global.BattleRound = function(acting, type=null) {

  const state = BattleSystem.getState();
  const roundType = type || (state.isMonster(acting) ? 'monster' : 'character');
  const actingPosition = state.getPosition(acting);

  Validate.isIn('BattleRound.type', roundType, ['monster','character','status']);

  const messages = [];
  const context = {};

  let abilityCode;
  let abilityData;

  let primaryWeapon = {};
  let secondaryWeapon = {};
  let target;
  let targetPosition;
  let time = 0;

  function getActingMonster() { return Monster(acting); }
  function getActingCharacter() { return Character(acting); }
  function getActingPosition() { return actingPosition; }
  function isActingMonster() { return roundType === 'monster'; }
  function isActingCharacter() { return roundType === 'character'; }
  function isStatusEffect() { return roundType === 'status'; }

  // ===============
  //    Abilities
  // ===============

  function setCharacterAbility(code, data={}) {
    abilityCode = code;
    abilityData = data;
  }

  function setMonsterAbility(key) {
    const prioritizedAbility = getActingMonster().getAbility(key);
    abilityCode = prioritizedAbility.code;
    abilityData = { ...prioritizedAbility, key };
  }

  function getCooldown() {
    if (isActingMonster()) { return getActingMonster().getAbilityCooldown(abilityData.key); }
    throw `Only monster abilities have cooldowns.`;
  }

  function applyCooldown() {
    if (isActingMonster()) {
      const cooldown = getCooldown();
      if (cooldown) {
        BattleSystem.getState().setCooldown(acting, abilityData.key, cooldown);
      }
    }
  }

  // =============
  //    Weapons
  // =============

  function compileWeaponData() {
    if (EquipmentComponent.lookup(acting) != null) {
      const equipment = EquipmentManager(acting);
      const main = equipment.getSlot(EquipmentSlot.primary);
      const off = equipment.getSlot(EquipmentSlot.secondary);

      if (main && WeaponComponent.lookup(main)) { primaryWeapon = distillWeapon(main); }
      if (off && WeaponComponent.lookup(off) && isShield(off) === false) { secondaryWeapon = distillWeapon(off); }
    }

    if (primaryWeapon.base == null) { primaryWeapon = null; }
    if (secondaryWeapon.base == null) { secondaryWeapon = null; }
  }

  // Shields are purely defensive, so one in the off-hand doesn't count as a secondary attack weapon.
  function isShield(itemId) {
    return Weapon(itemId).getBaseWeapon().getType() === 'shield';
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

  // =============
  //    Targets
  // =============

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

  // ==============
  //    Messages
  // ==============

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
      throw new Error(`BattleRound.time was not set by the ${abilityCode} ability.`)
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

    setCharacterAbility,
    setMonsterAbility,
    getAbilityCode: () => { return abilityCode; },
    getAbilityData: () => { return abilityData },
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
