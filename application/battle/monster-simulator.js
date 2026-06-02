global.MonsterSimulator = (function() {

  // TODO: We'll eventually use the monster brain to decide what actions to take.
  function executeBattleTurn(id) {
    const monster = Monster(id);
    const brain = monster.getBrain();
    return executeBasicAttack(monster);
  }

  // TODO: Still need to consider basic attack time. Setting it to a second for now. The basic attack command means,
  //       attack for 1 second, so a single attack command can have multiple swings or stabs in that time.
  function executeBasicAttack(monster) {
    const attack = monster.getBasicAttack();
    const attackText = TextSource.lookup(attack.attackText).getText();
    const messages = [{ text:attackText }];

    // TODO: Before anything else can be done we need to pick the target of the attack. We can use the base weapon to
    //       determine what characters can be attacked. This might depend on the position as well. If you're on the far
    //       left side of the formation you might not be able to hit the far right slot. The center position can hit
    //       all slots.
    //
    //       Monster size might need to be considered as well. There could be larger monsters that take up two
    //       positions, with only space for three of them in the same rank. Or even bigger monsters that take up the
    //       entire rank.
    //
    //       There's also something like an aggro table to consider as well. Each monster could track how much aggro
    //       it has towards each player and attack the highest aggro target. A simpler version could be to have each
    //       monster fixate on a target and always attack that target until they're forced to switch.

    return {
      messages: messages,
      time: 1000,
    };
  }

  return Object.freeze({
    executeBattleTurn,
    executeBasicAttack,
  })

})();
