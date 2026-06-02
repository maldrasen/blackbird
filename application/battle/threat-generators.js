
// All the threat calculation should happen here so that we can tweak the values as needed.
//
// These functions all take the current threat table and a weight as arguments. The weight value could be seen as a
// percentage, though it doesn't really matter. We can just multiply the threat values by the weight and add it to
// the current threat value. Only the difference between the values actually matter.
//
// If a character is producing the maximum threat for that function, the threat value should be around 100. If weight
// is also 100 the threat added by the function is 10000. Calculating the initial threat runs through each weighted
// function, so the initial threat table will have threats on the order of 100K.
//
// After the initial values are set characters add threat when performing actions. Attacking a monster produces threat
// for that character. Attacks that are intended to be taunts should produce a large amount of threat. Healing another
// character produces threat for all monsters.

global.ThreatGenerators = (function() {


  // Characters that are closet in position have some initial threat.
  function closest(threatTable, weight, monsterId) {
    const state = BattleController.getState();
    const position = state.getPositionOf(monsterId);

    Object.entries(state.getCharacterPositions()).forEach(([pos, id]) => {
      const distance = BattleHelper.distanceBetweenPositions(position, pos);

      let threat = 0;

      if (distance.position === 0) { threat += 60; }
      if (distance.position === 1) { threat += 30; }
      if (distance.position === 2) { threat += 10; }

      if (distance.rank === 0) { threat += 40; }

      threatTable[id] += threat * weight;
    });

  }

  // Kill the one in the dress
  function leastArmor(threatTable, weight) {

  }

  // Finish him!
  function leastHealth(threatTable, weight) {

  }

  return Object.freeze({
    closest,
    leastArmor,
    leastHealth,
  });

})();
