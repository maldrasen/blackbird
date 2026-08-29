global.BattleDamageSystem = (function() {

  // Some actions can contain multiple hits, so we need to check to see if the target is still up before applying
  // damage in case they were already killed or knocked out, which would remove them from the formation and cause
  // problems if we try and remove them again.
  //    Data: { entity, damage, damageTypes, hitLocation, isCrit }
  //
  function applyDamage(data) {
    const state = BattleSystem.getState();
    const target = data.entity;
    const damageTypes = data.damageTypes;

    if (state.isDown(target)) {
      throw new Error(`[${target}] is already down. Damage should not have been applied.`);
    }

    let actualDamage = 0;

    Object.entries(damageTypes).forEach(([type, damage]) => {
      const reduction = getReductionPercent(target, data.hitLocation, type);
      actualDamage += Math.round(damage * (1 - reduction/100));
    });

    if (StatusEffects(target).has('vulnerable')) {
      actualDamage = actualDamage * 2;
      StatusEffectSystem.consumeStack(target,'vulnerable');
    }

    if (StatusEffects(target).has('damned')) {
      actualDamage = actualDamage * 4;
      StatusEffectSystem.consumeStack(target,'damned');
    }

    actualDamage = Math.round(actualDamage * getDifficultyFactor(state, target));

    const health = HealthComponent.lookup(target);
    health.currentHealth -= actualDamage;

    const outcome = resolveDamageOutcome(state, target, health);
    HealthComponent.update(target, health);
    BattleInterface.showDamageEffect({ killed:['killed','knocked-out'].includes(outcome), ...data });

    if (outcome === 'killed') { BattleDeathSystem.killEntity(target); }
    if (outcome === 'knocked-out') { BattleDeathSystem.knockOutEntity(target); }

    return actualDamage;
  }

  // The difficulty options are player buffs. Damage dealt to monsters is scaled by the damage option, and damage
  // dealt to party characters is divided by the mitigation option.
  function getDifficultyFactor(state, target) {
    return state.isMonster(target) ? Difficulty.getDamageFactor() : Difficulty.getMitigationFactor();
  }

  // TODO: This function will also need to handle the spell resistance reduction. Some spells will still have a
  //       hitLocation, but an AoE spell, targeting several positions wouldn't. In that case we'd need to get an
  //       average damage resistance. A "blade tornado" spell for instance would deal slashing damage, so we'd still
  //       want to use character's armor's slash resistance, but average it across all locations. Other resistance
  //       types should be additive though. A character that has a 20% percent fire damage resistance amulet and a 10%
  //       fire damage resistance cloak should have an 30% overall fire damage resistance across every hit location.
  //       This is the same resistance used to resist status effects. Until equipment carries elemental resistances,
  //       elemental damage is reduced by the target's innate resistance alone.

  // Physical damage lands somewhere, so it's reduced by whatever armor covers that location on top of the target's
  // own resistance. Elemental damage has no location to cover yet, leaving only the innate resistance. A negative
  // resistance is a vulnerability either way, and raises the damage rather than reducing it.
  function getReductionPercent(target, hitLocation, type) {
    if (isPhysical(type) === false) { return cappedReduction(getInnateResistance(target, type)); }
    if (hitLocation == null) { throw new Error(`applyDamage() requires a hit location.`); }
    return cappedReduction(getEquippedReduction(target, hitLocation, type) + getInnateResistance(target, type));
  }

  function isPhysical(type) {
    return [DamageType.crush, DamageType.pierce, DamageType.slash].includes(type);
  }

  function cappedReduction(reduction) {
    return Math.min(reduction, BattleConstants.maxReduction);
  }

  function getEquippedReduction(target, hitLocation, type) {
    return EquipmentComponent.lookup(target) ? EquipmentManager(target).getDamageReduction(hitLocation, type) : 0;
  }

  function getInnateResistance(target, type) {
    return BattleSystem.getState().isMonster(target) ?
      Monster(target).getResistance(type) :
      Character(target).getResistance(type);
  }

  // Any time damage is applied we should call this addDownedMessage() function to add the knocked out or killed
  // messages. This needs to be a separate call so that each damage source can add its own messages about what's
  // causing damage, but the downed messages are the same no matter the cause.
  function addDownedMessage(entity) {
    const state = BattleSystem.getState();
    const weaver = Weaver({ A:entity });

    if (state.isKnockedOut(entity)) {
      Console.log(`[${entity}] was knocked out`,{ system:'BattleSystem', level:2 });
      BattleSystem.getRound().addMessage({ text:`{A:ActingName} was knocked out!`, color:'important' }, weaver);
    } else if (state.isAlive(entity) === false) {
      Console.log(`[${entity}] was killed`,{ system:'BattleSystem', level:2 });
      BattleSystem.getRound().addMessage({ text:`{A:ActingName} was killed!`, color:'important' }, weaver);
    }
  }

  // Monsters simply die at zero health. Characters brought to zero or below are knocked out, keeping their negative
  // health, and are only killed when that health falls below the negative of their vitality.
  function resolveDamageOutcome(state, target, health) {
    if (health.currentHealth > 0) { return null; }
    if (state.isMonster(target)) { health.currentHealth = 0; return 'killed'; }
    if (health.currentHealth < -Attributes(target).getVitality()) { return 'killed'; }
    return 'knocked-out';
  }

  return {
    applyDamage,
    addDownedMessage,
  };

})();
