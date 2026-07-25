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

    if (state.hasStatusEffect(target,'vulnerable')) {
      actualDamage = actualDamage * 2;
    }

    const health = HealthComponent.lookup(target);
    health.currentHealth -= actualDamage;

    const outcome = resolveDamageOutcome(state, target, health);
    HealthComponent.update(target, health);
    BattleInterface.showDamageEffect({ killed:['killed','knocked-out'].includes(outcome), ...data });

    if (outcome === 'killed') { BattleDeathSystem.killEntity(target); }
    if (outcome === 'knocked-out') { BattleDeathSystem.knockOutEntity(target); }

    return actualDamage;
  }

  // Attacks without a hit location bypass armor entirely, and monsters have no equipment to mitigate with. Armor
  // profiles only cover the physical damage types, so elemental damage always passes through untouched.
  function getReductionPercent(target, hitLocation, type) {
    if (hitLocation == null) { return 0; }
    if (EquipmentComponent.lookup(target) == null) { return 0; }
    return EquipmentManager(target).getDamageReduction(hitLocation, type);
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
