global.BattleRequirements = (function() {

  return Object.freeze({
    withHitLocation: (...slots) => { return (context) => { return slots.includes(context.hitLocation); }},
  });

})();
