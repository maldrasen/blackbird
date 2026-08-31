global.BattleConsumableSystem = (function() {

  // TODO: Probably don't need this system now that the effects have all be unified.
  function useConsumable(code) {
    BattleSystem.getRound().addTime(750);
    EffectSystem.applyDuringBattle(Consumable.lookup(code));
  }

  return {
    useConsumable,
  };

})();
