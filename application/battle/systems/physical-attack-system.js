global.PhysicalAttackSystem = (function() {

  function processHit(attackRoll, defendRoll) {
    updateContext(attackRoll);

    const round = BattleSystem.getRound();
    const attacker = round.getActing();
    const target = round.getTarget();
    const weapon = attackRoll.getWeapon();
    const enchantment = getOnHitEnchantment(weapon);

    const damageRoll = DamageRoll(attacker, attackRoll, defendRoll);
    const damageTypes = damageRoll.getDamageTypes();

    if (damageRoll.hasMessage()) {
      round.addMessage(damageRoll.getMessage());
    }

    if (enchantment) {
      applyEnchantmentResult(enchantment.processBeforeHit(getEnchantmentContext(weapon), damageTypes), target);
    }

    const actualDamage = BattleDamageSystem.applyDamage({
      entity: target,
      damageTypes: damageTypes,
      hitLocation: attackRoll.getHitLocation(),
      isCrit: attackRoll.isCrit(),
    });

    round.addMessage({ text:`Hit for ${actualDamage} damage!` });

    Console.log(`Damage Roll [${attacker}]`,{ system:'BattleSystem', level:3, data:{
      actualDamage, damageTypes
    }});

    // A status applied after the hit waits for the next attack, which a downed target won't be taking.
    if (enchantment && BattleSystem.getState().isDown(target) === false) {
      applyEnchantmentResult(enchantment.processAfterHit(getEnchantmentContext(weapon)), target);
    }

    BattleDamageSystem.addDownedMessage(target);
  }

  // A hit with an enchanted weapon runs the enchantment's on hit hooks, once before the damage is applied and once
  // after. The weapon's pattern decides whether the enchantment fires at either moment (endanger only fires against
  // its species, and only after the hit).
  function getOnHitEnchantment(weapon) {
    const enchantment = weapon ? weapon.getEnchantment() : null;
    return (enchantment?.getTrigger() === EnchantmentTrigger.onHit) ? enchantment : null;
  }

  function getEnchantmentContext(weapon) {
    return { I:weapon.getId(), ...BattleSystem.getRound().getContext() };
  }

  // A hook hands back the status effects to roll against the target along with the message shown when one lands, or
  // null when the enchantment didn't fire.
  function applyEnchantmentResult(result, target) {
    if (result == null) { return; }

    const landed = result.effects.filter(effect => EffectSystem.applyStatus(target, effect));
    if (landed.length > 0) { BattleSystem.getRound().addMessage({ text:result.message }); }
  }

  // If the attack missed, no damage is done, but the crits and fumbles may add status effects to either the attacker
  // or the defender.
  function processMiss(attackRoll, defendRoll) {
    updateContext(attackRoll);

    const round = BattleSystem.getRound();
    const attacker = round.getActing();
    const target = round.getTarget();

    if (defendRoll.isCrit()) { addPoisedStatus(target, defendRoll.getDefendSkill()); }
    if (attackRoll.isFumble()) { addOffBalanceStatus(attacker); }
    if (defendRoll.isFumble()) { addVulnerableStatus(target); }

    BattleSystem.getRound().addMessage({ text:`Miss`, color:'miss' });
  }

  // When making an attack, messages that come from the weapon enchantments (and probable other places) expect these
  // values to be in the context. If the basic attack has multiple attacks the hit location will change every time,
  // but that should be fine as long as the context has the latest hit location.
  function updateContext(attackRoll) {
    const round = BattleSystem.getRound();
    round.addToContext('hitLocation',attackRoll.getHitLocation());
    round.addToContext('weapon', attackRoll.getWeaponId());
  }

  function addPoisedStatus(entity, skill) {
    const message = {
      'dodge': `{T:TargetName} leaps away with stunning agility, and is now {S/pst}Poised{/S} and ready to defend {T:him}self.`,
      'block': `{T:TargetName} braces {T:him}self, becoming {S/pst}Poised{/S} and harder to hit.`,
      'parry': `{T:TargetName} flourishes {T:his} blade, {T:his} {S/pst}Poised{/S} stance ready to defend against any attack.`,
    }[skill];

    addStatus(entity, 'poised', message);
  }

  function addOffBalanceStatus(entity) {
    addStatus(entity, 'off-balance', `{A:ActingName's} clumsy attack leaves {A:him} overextended and {S/nst}Off Balance{/S}.`);
  }

  function addVulnerableStatus(entity) {
    addStatus(entity, 'vulnerable', `Though the attack missed {T:targetName}, it left {T:him} in a {S/nst}Vulnerable{/S} position.`);
  }

  function addStatus(entity, code, message) {
    BattleSystem.addStatus(entity, code, { count:1 });
    BattleSystem.getRound().addMessage({ text:message });
  }

  return {
    updateContext,
    processHit,
    processMiss,
  };

})();