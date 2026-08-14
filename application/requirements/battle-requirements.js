global.BattleRequirements = (function() {

  return {
    withHitLocation: (...slots) => { return (context) => { return slots.includes(context.hitLocation); }},
  };

})();
