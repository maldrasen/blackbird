global.MonsterSimulator = (function() {

  function executeBattleTurn(id) {
    const monster = BaseMonster.lookup(MonsterComponent.lookup(id).code);
    const brain = MonsterBrain.lookup(monster.getBrain());
    const attributes = AttributesComponent.lookup(id);
    const health = HealthComponent.lookup(id);

    console.log(`${monster.getCode()} (${brain.getCode()})`);
    console.log(' - ',attributes);
    console.log(' - ',health);

    return executeBasicAttack(monster);
  }

  // Need a little information here about weapon name, style of weapon attack (swing, thrust, etc.) If the monster is
  // using a bite or a claw attack we need to mention that as well. Monsters need equipment then, and monsters need
  // basic attack information. Need to consider basic attack time as well. Setting it to a second for now. The basic
  // attack command means, attack for 1 second, so a single attack command can have multiple swings or stabs in that
  // time.
  function executeBasicAttack(monster) {
    const messages = [
      { text:`${monster.getName()} attacks.` },
    ];

    return {
      messages: messages,
      time: 1000,
    };
  }

  return Object.freeze({
    executeBattleTurn
  })

})();
