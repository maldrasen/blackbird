global.EnchantmentSystem = (function() {

  // A hit with an enchanted weapon runs the enchantment's on hit hooks, once before the damage is applied and once
  // after. The weapon's pattern decides whether the enchantment fires at either moment (endanger only fires against
  // its species, and only after the hit). Whatever a hook hands back is rolled against the target.
  function processBeforeHit(weapon, target, damageTypes) {
    const enchantment = getEnchantment(weapon, EnchantmentTrigger.onHit);
    if (enchantment) {
      applyResult(enchantment.processBeforeHit(getContext(weapon), damageTypes), target, EffectSystem.applyStatus);
    }
  }

  function processAfterHit(weapon, target) {
    const enchantment = getEnchantment(weapon, EnchantmentTrigger.onHit);
    if (enchantment) {
      applyResult(enchantment.processAfterHit(getContext(weapon)), target, EffectSystem.applyStatus);
    }
  }

  // Once the acting entity's ability has resolved, each weapon they hold with an end of round enchantment gets to see
  // what they did and may hand back buffs for it. A round with no ability (a status round) gives them nothing to react
  // to, and a downed actor has no next turn to be buffed for.
  function processEndRound() {
    const round = BattleSystem.getRound();
    const acting = round.getActing();

    if (round.getAbility() == null) { return; }
    if (BattleSystem.getState().isDown(acting)) { return; }

    getEndRoundWeapons(round).forEach(weapon => {
      applyResult(weapon.getEnchantment().processEndRound(getContext(weapon)), acting, EffectSystem.applyBuff);
    });
  }

  function getEndRoundWeapons(round) {
    return [round.getPrimaryWeapon(), round.getSecondaryWeapon()].filter(weapon => {
      return getEnchantment(weapon, EnchantmentTrigger.endRound) != null;
    });
  }

  function getEnchantment(weapon, trigger) {
    const enchantment = weapon ? weapon.getEnchantment() : null;
    return (enchantment?.getTrigger() === trigger) ? enchantment : null;
  }

  function getContext(weapon) {
    return { I:weapon.getId(), ...BattleSystem.getRound().getContext() };
  }

  // A hook hands back the effects to roll for an entity along with the message shown when one lands, or null when
  // the enchantment didn't fire. The on hit hooks roll statuses against the target; the end of round hook rolls buffs
  // for the acting entity.
  function applyResult(result, entity, apply) {
    if (result == null) { return; }

    const landed = result.effects.filter(effect => apply(entity, effect));
    if (landed.length > 0) { BattleSystem.getRound().addMessage({ text:result.message }); }
  }

  return {
    processBeforeHit,
    processAfterHit,
    processEndRound,
  };

})();
