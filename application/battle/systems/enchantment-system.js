global.EnchantmentSystem = (function() {

  // Once the acting entity's ability has resolved, each weapon they hold with an end of round enchantment gets to see
  // what they did and may hand back buffs for it. A round with no ability (a status round) gives them nothing to react
  // to, and a downed actor has no next turn to be buffed for.
  function processEndRound() {
    const round = BattleSystem.getRound();
    const acting = round.getActing();

    if (round.getAbility() == null) { return; }
    if (BattleSystem.getState().isDown(acting)) { return; }

    getEndRoundWeapons(round).forEach(weapon => {
      applyResult(weapon.getEnchantment().processEndRound({ I:weapon.getId(), ...round.getContext() }), acting);
    });
  }

  function getEndRoundWeapons(round) {
    return [round.getPrimaryWeapon(), round.getSecondaryWeapon()].filter(weapon => {
      return weapon != null && weapon.getEnchantment()?.getTrigger() === EnchantmentTrigger.endRound;
    });
  }

  // A hook hands back the buffs to roll for the acting entity along with the message shown when one takes hold, or
  // null when the enchantment didn't fire.
  function applyResult(result, acting) {
    if (result == null) { return; }

    const landed = result.effects.filter(effect => EffectSystem.applyBuff(acting, effect));
    if (landed.length > 0) { BattleSystem.getRound().addMessage({ text:result.message }); }
  }

  return {
    processEndRound,
  };

})();
