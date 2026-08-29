global.BattleRequirements = (function() {

  function activeMonsterCount() {
    return BattleSystem.getState().getActiveMonsters().length;
  }

  function againstBetween(min,max) {
    const count = activeMonsterCount();
    return count >= min && count <= max;
  }

  return {
    actingIsMonster: () =>         { return context => { return BattleSystem.getRound().isActingMonster(); }},
    actingIsCharacter: () =>       { return context => { return BattleSystem.getRound().isActingCharacter(); }},
    againstSingle: () =>           { return context => { return activeMonsterCount() === 1; }},
    againstMultiple: () =>         { return context => { return activeMonsterCount() > 1; }},
    againstAtLeast: x =>           { return context => { return activeMonsterCount() >= x; }},
    againstAtMost: x =>            { return context => { return activeMonsterCount() <= x; }},
    againstBetween: (min,max) =>   { return context => { return againstBetween(min,max); }},
    withHitLocation: (...slots) => { return context => { return slots.includes(context.hitLocation); }},
  };

})();
