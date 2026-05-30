global.MonsterBrain = (function() {

  function executeBattleTurn(id) {
    const monster = Monster.lookup(MonsterComponent.lookup(id).code);
    console.log("Monster:",monster.getName());

    return {
      messages: [
        { text:`${monster.getName()} attacks.` },
        { text:`${Random.roll(20)}`, properties:{ color:'important' } },
        { text:`<div class='button'>Done.</div>` }
      ],
      time: 500,
    };
  }

  return Object.freeze({
    executeBattleTurn
  })

})();
