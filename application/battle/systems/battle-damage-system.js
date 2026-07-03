global.BattleDamageSystem = (function() {

  // Some actions can contain multiple hits, so we need to check to see if the target is alive before applying damage
  // in case they were already killed, which would remove them from the formation and cause problems if we try and
  // remove them again.
  //    Data: { entity, damage, damageTypes, hitLocation, isCrit }
  //
  function applyDamage(data) {
    const state = BattleSystem.getState();
    const target = data.entity;
    const damageTypes = data.damageTypes;

    if (state.isAlive(target) === false) {
      throw new Error(`[${target}] is already dead. Damage should not have been applied.`);
    }

    let actualDamage = 0;
    let killed = false;

    // TODO: The actual damage done will need to be reduced by the armor of the hit location, the character's
    //       resistances to certain damage types. I don't think we need to modify the damageTypes object here,
    //       because once we get the total actual damage that should be all that matters.

    // TODO: How does resistance reduce damage? When rolling to resist an effect we make opposed rolls, so the scales
    //       of the numbers don't matter. However... if a character has 20 resistance (or a -15) resistance to a damage
    //       type that should either reduce (or raise) by a percent or do a flat reduction... A flat reduction would
    //       scale better. Meaning if a character has 20 fire resistance, and took 22 fire damage, they'd actually take
    //       2 damage, or 0 if the damage was less than 20... Seems overly powerful though. Still, I'm not sure how the
    //       resistance values will scale at all. Should effect resistance and damage reduction be two different stats?

    Object.values(damageTypes).forEach(damage => {
      actualDamage += damage;
    });

    if (state.hasStatusEffect(target,'vulnerable')) {
      actualDamage = actualDamage * 2;
    }

    const health = HealthComponent.lookup(target);
    health.currentHealth -= actualDamage;

    if (health.currentHealth <= 0) {
      health.currentHealth = 0;
      killed = true;
      BattleDeathSystem.killEntity(target);
    }

    BattleInterface.showDamageEffect({ killed, ...data });
    HealthComponent.update(target, health);

    return actualDamage;
  }

  return Object.freeze({
    applyDamage,
  });

})();
