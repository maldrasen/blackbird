global.ManaMath = (function() {

  // An entity's mana grades come from its species. Humans have no natural mana, so their species has no grades at
  // all, and beasts have no species to begin with. Both are treated as an F in every color.
  function manaGrades(id) {
    const species = ActorComponent.lookup(id).species;
    return species ? (Species.lookup(species).getMana() || {}) : {};
  }

  // An F grade (or no grade) means a species has no natural affinity for a color, so nothing is rolled and the pool
  // stays empty. Those pools can still be deepened by the mana fonts found in the dungeon. Note that rollDice()
  // treats a dice count of zero as one, which is why these short circuit rather than rolling zero dice.
  function startingPool(grade) {
    const dice = LetterGradeHelper.manaBase(grade);
    return (dice > 0) ? Random.rollDice({ x:dice, d:10 }) : 0;
  }

  // Rolled for every color each time a character levels up. Species that have an affinity for a color grow that pool
  // naturally as they level, while humans only ever grow their pools by finding fonts.
  function levelGrowth(grade) {
    const dice = LetterGradeHelper.manaBase(grade);
    return (dice > 0) ? Random.rollDice({ x:dice, d:4 }) : 0;
  }

  return {
    manaGrades,
    startingPool,
    levelGrowth,
  };

})();
