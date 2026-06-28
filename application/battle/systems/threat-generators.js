
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
  const threatBase = 100;

  // Characters that are closet in position have some initial threat.
  function closest(threatTable, weight, monsterId) {
    const state = BattleSystem.getState();
    const position = state.getPosition(monsterId);

    Object.entries(state.getPartyFormation()).forEach(([id, pos]) => {
      const distance = BattleHelper.distanceBetweenPositions(position, pos);

      let threat = 0;
      if (distance.position === 0) { threat += threatBase * 0.60; }
      if (distance.position === 1) { threat += threatBase * 0.30; }
      if (distance.position === 2) { threat += threatBase * 0.10; }
      if (distance.rank === 0) { threat += threatBase * 0.40; }

      threatTable[id] += Math.round(threat * weight);
    });
  }

  // TODO: Kill the one in the dress. I'm going to need to come back and do this one later, once the character armor
  //       is in a better place. This will need to total all the character's armors, find who has the lowest and the
  //       highest, use tha as a ratio to give the lowest 100 threat, the highest 0, and lerp the ones inbetween.
  function leastArmor(threatTable, weight) {}

  // Finish him! Threat generates is the inverse of health percentage. A completely healthy character generates 0
  // threat, and threat approaches 100 as they become more injured.
  function leastHealth(threatTable, weight) {
    BattleSystem.getState().getCharacters().forEach(id => {
      const health = HealthComponent.lookup(id);
      threatTable[id] += Math.round((1 - (health.currentHealth / health.maxHealth)) * threatBase * weight);
    });
  }

  // Some monsters have a gender preference for the targets they pick. Maybe they want to kill the men off so they can
  // kidnap the women. Maybe they want to kill the women so they can kidnap the men. Who knows? For these functions a
  // futa is both male and female while an enby is neither male nor female.
  function killMen(threatTable, weight) {
    BattleSystem.getState().getCharacters().forEach(id => {
      switch (ActorComponent.lookup(id).gender) {
        case Gender.male: threatTable[id] += Math.round(100 * weight); break;
        case Gender.futa: threatTable[id] += Math.round(50 * weight); break;
      }
    });
  }

  function killWomen(threatTable, weight) {
    BattleSystem.getState().getCharacters().forEach(id => {
      switch (ActorComponent.lookup(id).gender) {
        case Gender.female: threatTable[id] += Math.round(100 * weight); break;
        case Gender.futa: threatTable[id] += Math.round(50 * weight); break;
      }
    });
  }

  return Object.freeze({
    closest,
    leastArmor,
    leastHealth,
    killMen,
    killWomen,
  });

})();
