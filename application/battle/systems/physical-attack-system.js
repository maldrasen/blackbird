global.PhysicalAttackSystem = (function() {

  function processHit(attackRoll, defendRoll) {
    updateContext(attackRoll);

    const round = BattleSystem.getRound();
    const attacker = round.getActing();
    const target = round.getTarget();
    const weapon = attackRoll.getWeapon();

    const damageRoll = DamageRoll(attacker, attackRoll, defendRoll);
    const damageTypes = damageRoll.getDamageTypes();

    if (damageRoll.hasMessage()) {
      round.addMessage(damageRoll.getMessage());
    }

    EnchantmentSystem.processBeforeHit(weapon, target, damageTypes);

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
    if (BattleSystem.getState().isDown(target) === false) {
      EnchantmentSystem.processAfterHit(weapon, target);
    }

    BattleDamageSystem.addDownedMessage(target);
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