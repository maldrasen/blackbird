global.PhysicalAttackSystem = (function() {

  function processHit(attackRoll, defendRoll) {
    updateContext(attackRoll);

    const round = BattleSystem.getRound();
    const attacker = round.getActing();
    const target = round.getTarget();

    const damageRoll = DamageRoll(attacker, attackRoll, defendRoll);
    const damageTypes = damageRoll.getDamageTypes();

    if (damageRoll.hasMessage()) {
      round.addMessage(damageRoll.getMessage());
    }

    if (attackRoll.getWeapon()) {
      processEnchantment(attackRoll.getWeapon(), target, damageTypes);
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

    BattleDamageSystem.addDownedMessage(target);
  }

  // A hit with an enchanted weapon runs the enchantment's on hit trigger. The weapon's pattern decides whether the
  // enchantment fires on this hit (endanger only fires against its species) and hands back the status effects to
  // roll against the target along with the message shown when one lands. A pattern that adjusts the raw attack
  // damage changes the damageTypes it was given.
  function processEnchantment(weapon, target, damageTypes) {
    const enchantment = weapon.getEnchantment();
    if (enchantment?.getTrigger() === EnchantmentTrigger.onHit) {
      const round = BattleSystem.getRound();
      const context = { I:weapon.getId(), ...round.getContext() };
      const result = enchantment.processOnHit(context, damageTypes);
      if (result == null) { return; }

      const landed = result.effects.filter(effect => EffectSystem.applyStatus(target, effect));
      if (landed.length > 0) { round.addMessage({ text:result.message }); }
    }
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
    processEnchantment,
    processMiss,
  };

})();