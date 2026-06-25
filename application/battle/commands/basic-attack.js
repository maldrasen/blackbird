global.BasicAttack = (function() {

  // When we execute the basic attack we first find the monster attack, or equipped weapon. Then we make attack and
  // defend rolls using the base weapon skill type for attacker. Because there are three possible states for each roll
  // (crit, fumble, or normal) we're left with a table with 9 possible outcomes for each attack.
  //
  //           D-Crit          D-Fum            D-Nor
  //   A-Crit  [Reroll]        [A++] & [D--]    [A++]
  //   A-Fum   [A--] & [D++]   [A--] & [D--]    [A--]
  //   A-Nor   [D++]           [D--]            [Normal]
  //
  //   [A++]   Attacker gets a positive status effect that increases physical weapon damage.
  //   [A--]   Attacker gets a status effect (like off balance)
  //   [D++]   Defender gets a positive status effect (something to reduce incoming damage)
  //   [D--]   Defender gets a negative status effect (like vulnerable)
  //
  // By handling crits and fumbles as status effects that increase or reduce damage we reduce the number states and
  // keep some of the interesting situations (like when an attacker crits and the defender fumbles, the added damage
  // from the critting state and the extra damage from the vulnerable state will add up to 4x damage)
  //
  // By separating the rolls and the status effects like this we also separate the actual to-hit from the crits and
  // fumbles. An attacker can crit (doing the best they can) but still miss their target.

  function execute() {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const target = round.getTarget();
    const attacks = calculateAttacks();

    round.setTime(totalTime(attacks),false);

    const rolls = attacks.map(attack => {
      const attackRoll = PhysicalAttackRoll(acting, target, attack);
      const defendRoll = DefendRoll(target, acting, attackRoll);
      return { attack:attackRoll, defend:defendRoll };
    });

    for (let i=0; i<attacks.length; i++) {
      if (rolls[i].attack.isCrit() && rolls[i].defend.isCrit()) {
        return execute(acting, target);
      }
    }

    rolls.forEach(roll => {
      const context = buildAttackContext(roll)
      const attackText = Random.from(Dialog.lookupTemplate(DialogCategory.attackText, roll.attack.getTextKey(), context));

      if (state.isAlive(context.T)) {
        round.addMessage({ text:attackText }, Weaver(context));
        (roll.attack.getFinalValue() > roll.defend.getFinalValue()) ?
          PhysicalAttackSystem.processHit(roll.attack, roll.defend):
          PhysicalAttackSystem.processMiss(roll.attack, roll.defend);
      }
    });
  }

  // To calculate the weapon attacks we alternate between a character's equipped primary and secondary weapons, adding
  // attacks to a list until we have enough attacks to fill one second. The attacks may take more than one second. If
  // a character's primary weapon strike takes 900ms, they will attack twice but only every 1800ms. Alternatively, a
  // character with a weapon speed of 1200ms will attack once every 1200ms, so it might seem like they attack more
  // often, but really they're getting fewer hits in. It's just that they get to choose their actions more frequently.
  // A character that has both a primary and a secondary weapon equipped will use them each 75% faster.
  function calculateAttacks() {
    const round = BattleSystem.getRound();
    const speedFactor = round.getSpeedFactor();

    const attacks = [];
    const weapons = {
      primary: round.getPrimaryWeapon(),
      secondary: round.getSecondaryWeapon(),
    }

    let hand = 'primary';
    let time = 0;

    while(time < 1000) {
      const weapon = weapons[hand];
      const baseWeapon = BaseWeapon.lookup(weapon.base);

      let strikeTime = baseWeapon.getSpeed() * speedFactor;
      if (weapons.primary && weapons.secondary) {
        strikeTime = Math.round(strikeTime * 0.75);
      }

      attacks.push({
        code: 'basic-attack',
        id: weapon.id,
        base: weapon.base,
        name: weapon.name,
        textKey: weapon.textKey,
        hand: hand,
        time: strikeTime
      });

      time += strikeTime;
      hand = (hand === 'primary' && weapons.secondary) ? 'secondary' : 'primary';
    }

    return attacks;
  }

  function totalTime(attacks) {
    return attacks.reduce((total, attack) => {
      return total + attack.time
    },0);
  }

  // Because the context needs to include the hit location, crit, and fumble states, it will be different for each
  // attack.
  function buildAttackContext(roll) {
    const round = BattleSystem.getRound();
    const attackRoll = roll.attack;
    const defendRoll = roll.defend;

    const context = {
      A: round.getActing(),
      T: round.getTarget(),
      hitLocation: attackRoll.getHitLocation(),
      weaponName: attackRoll.getWeaponName(),
    };

    if (attackRoll.isCrit()) { context.attack = 'crit'; }
    if (attackRoll.isFumble()) { context.attack = 'fumble'; }
    if (context.attack == null) { context.attack = 'normal'; }
    if (defendRoll.isCrit()) { context.defend = 'crit'; }
    if (defendRoll.isFumble()) { context.defend = 'fumble'; }
    if (context.defend == null) { context.defend = 'normal'; }
    return context;
  }

  return Object.freeze({
    execute,
    calculateAttacks,
    totalTime,
  });

})();
