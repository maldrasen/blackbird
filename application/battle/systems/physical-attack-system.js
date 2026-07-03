global.PhysicalAttackSystem = (function() {

  // Options: { damageFactor }
  function processHit(attackRoll, defendRoll, options={}) {
    updateContext(attackRoll);

    const round = BattleSystem.getRound();
    const attacker = round.getActing();
    const target = round.getTarget();

    const damageRoll = DamageRoll(attacker, attackRoll, defendRoll, options);
    const damageTypes = damageRoll.getDamageTypes();

    if (damageRoll.hasMessage()) {
      round.addMessage(damageRoll.getMessage());
    }

    // If the hit comes from a real weapon with a weapon enchantment, we process the on hit effect of the enchantment.
    // This can add a message or modify the raw attack damage. If the damage is adjusted by the enchantment the
    // damageTypes object is modified from within the processOnHit() function.
    if (attackRoll.getWeapon()) {
      const weapon = attackRoll.getWeapon();
      if (weapon.hasEnchantment()) {
        weapon.getEnchantment().processOnHit(damageTypes);
      }
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

    if (BattleSystem.getState().isAlive(target) === false) {
      Console.log(`[${target}] was killed`,{ system:'BattleSystem', level:2 });
      round.addMessage({ text:`{T:TargetName} was killed!`, color:'important' });
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

  // When making an attack messages that come from the weapon enchantments (and probable other places) expect these
  // values to be in the context. If the basic attack has multiple attacks the hit location will change every time,
  // but that should be fine as long as the context has the latest hit location.
  function updateContext(attackRoll) {
    const round = BattleSystem.getRound();
    round.addToContext('hitLocation',attackRoll.getHitLocation());
    round.addToContext('weaponName', attackRoll.getWeaponName());
    round.addToContext('baseWeapon', attackRoll.getBaseWeaponCode());
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
    BattleSystem.getState().addStatus(BattleStatusEffect(entity, code, { duration:1 }));
    BattleSystem.getRound().addMessage({ text:message });
  }

  return Object.freeze({
    updateContext,
    processHit,
    processMiss,
  })

})();