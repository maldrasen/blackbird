global.BattleDamageSystem = (function() {
  const maxReduction = 80;

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

    if (state.hasStatusEffect(target,'vulnerable')) {
      actualDamage = actualDamage * 2;
      StatusEffectSystem.consumeStack(target,'vulnerable');
    }

    if (state.hasStatusEffect(target,'damned')) {
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
  //       This is the same resistance used to resist status effects.

  function getReductionPercent(target, hitLocation, type) {
    if ([DamageType.crush, DamageType.pierce, DamageType.slash].includes(type)) {
      if (hitLocation == null) { throw new Error(`applyDamage() requires a hit location.`); }
      const reduction = getEquippedReduction(target, hitLocation, type) + getInnateResistance(target, type);
      return Math.min(reduction, maxReduction);
    }
    throw new Error(`TODO: Equipment elemental resistances.`);
  }

  function getEquippedReduction(target, hitLocation, type) {
    return EquipmentComponent.lookup(target) ? EquipmentManager(target).getDamageReduction(hitLocation, type) : 0;
  }

  function getInnateResistance(target, type) {
    return BattleSystem.getState().isMonster(target) ?
      Monster(target).getResistance(type) :
      Character(target).getResistance(type);
  }

  // Monsters simply die at zero health. Characters brought to zero or below are knocked out, keeping their negative
  // health, and are only killed when that health falls below the negative of their vitality.
  function resolveDamageOutcome(state, target, health) {
    if (health.currentHealth > 0) { return null; }
    if (state.isMonster(target)) { health.currentHealth = 0; return 'killed'; }
    if (health.currentHealth < -Attributes(target).getVitality()) { return 'killed'; }
    return 'knocked-out';
  }

  return Object.freeze({
    applyDamage,
  });

})();
