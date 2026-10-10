global.EnchantmentSystem = (function() {

  // A hit with an enchanted weapon runs the enchantment's on hit hooks, once before the damage is applied and once
  // after. The weapon's pattern decides whether the enchantment fires at either moment (endanger only fires against
  // its species, and only after the hit).
  function processBeforeHit(weapon, damageTypes) {
    const enchantment = getEnchantment(weapon, EnchantmentTrigger.onHit);
    if (enchantment) {
      applyResult(enchantment.processBeforeHit(getContext(weapon), damageTypes), getContext(weapon));
    }
  }

  function processAfterHit(weapon) {
    const enchantment = getEnchantment(weapon, EnchantmentTrigger.onHit);
    if (enchantment) {
      applyResult(enchantment.processAfterHit(getContext(weapon)), getContext(weapon));
    }
  }

  // Once the acting entity's ability has resolved, each weapon they hold with an end of round enchantment gets to see
  // what they did and may hand back buffs for it. A round with no ability (a status round) gives them nothing to react
  // to, and a downed actor has no next turn to be buffed for.
  function processEndRound() {
    const round = BattleSystem.getRound();

    if (round.getAbility() == null) { return; }
    if (BattleSystem.getState().isDown(round.getActing())) { return; }

    getEndRoundWeapons(round).forEach(weapon => {
      applyResult(weapon.getEnchantment().processEndRound(getContext(weapon)), getContext(weapon));
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

  // A hook hands back the effects to apply, each of which decides for itself who it lands on, and may add a message
  // shown when at least one of them does. It returns null when the enchantment didn't fire.
  function applyResult(result, context) {
    if (result == null) { return; }

    const landed = result.effects.filter(effect => EffectSystem.applyEnchantmentEffect(effect, context));
    if (landed.length > 0 && result.message) { BattleSystem.getRound().addMessage({ text:result.message }); }
  }

  return {
    processBeforeHit,
    processAfterHit,
    processEndRound,
  };

})();
