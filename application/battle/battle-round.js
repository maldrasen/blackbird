global.BattleRound = function(acting, type=null) {

  const state = BattleSystem.getState();
  const roundType = type || (state.isMonster(acting) ? 'monster' : 'character');
  const actingPosition = state.getPosition(acting);

  Validate.isIn('BattleRound.type', roundType, ['monster','character','status']);

  const messages = [];
  const context = {};
  const appliedStatuses = new Set();

  let ability;
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

  // Only monsters have cooldowns. A character can use their abilities as often as they like, provided they pay the
  // stamina or mana for them.
  function applyCooldown() {
    if (isActingMonster() && ability.getCooldown() > 0) {
      BattleSystem.getState().setCooldown(acting, ability.getId(), ability.getCooldown());
    }
  }

  // =============
  //    Weapons
  // =============
  // The weapons the acting entity attacks with. Shields are purely defensive, so one in the off hand doesn't count
  // as a secondary weapon.

  function getPrimaryWeapon() { return getWeaponInSlot(EquipmentSlot.primary); }

  function getSecondaryWeapon() { return getWeaponInSlot(EquipmentSlot.secondary); }

  function getWeaponInSlot(slot) {
    if (EquipmentComponent.lookup(acting) == null) { return null; }

    const itemId = EquipmentManager(acting).getSlot(slot);
    if (itemId == null) { return null; }

    const item = Item(itemId);
    return item.getBase().isWeapon() ? item : null;
  }

  // ====================
  //    Status Effects
  // ====================
  // We need a way to track status effects that were added this round. A status effect like poised can be added on the
  // character's turn (when they use defend) or on an enemy turn (when they crit at their defend roll). Poised only
  // lasts one round though, so we need to check to see if the status was applied this round, and only remove poised
  // if it wasn't.

  function addAppliedStatus(code) { appliedStatuses.add(code); }
  function hasAppliedStatus(code) { return appliedStatuses.has(code); }

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

  function getSpeedFactor() {
    return ActorComponent.lookup(acting).species ?
      Character(acting).getSpeedFactor() :
      Monster(acting).getBaseMonster().getSpeedFactor();
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
      throw new Error(`BattleRound.time was not set by the ${ability ? ability.getName() : roundType} round.`);
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

    setAbility: (model) => { ability = model; },
    getAbility: () => { return ability; },
    applyCooldown,

    getPrimaryWeapon,
    getSecondaryWeapon,

    addAppliedStatus,
    hasAppliedStatus,

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
