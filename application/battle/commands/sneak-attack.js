global.SneakAttack = (function() {

  function execute() {
    const round = BattleSystem.getRound();
    round.setTime(1000);
    round.addMessage({ text:'TODO: Sneak Attack' })
  }

  return Object.freeze({
    execute,
  });

})();