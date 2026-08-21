global.BattleRequirements = (function() {

  function activeMonsterCount() {
    return BattleSystem.getState().getActiveMonsters().length;
  }

  return {
    againstSingle: () => { return (context) => { return activeMonsterCount() === 1; }},
    againstMultiple: () => { return (context) => { return activeMonsterCount() > 1; }},
    againstAtLeast: x => { return (context) => { return activeMonsterCount() >= x }},
    againstAtMost: x => { return (context) => { return activeMonsterCount() <= x }},
    withHitLocation: (...slots) => { return (context) => { return slots.includes(context.hitLocation); }},
  };

})();
