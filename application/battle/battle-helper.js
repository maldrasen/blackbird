global.BattleHelper = (function() {

  // Weapon Ranges
  //   Short:    Daggers and fists can only reach the character directly in front or diagonal.
  //   Close:    Swords, axes, maces, etc. can hit the front rank from the front, in front or two positions away.
  //   Extended: Polearms can hit the back rank from the front, the front from the back, in any position.
  //   Long:     Bows can hit any position.
  function isAttackWithinRange(reach, p1, p2) {
    const distance = distanceBetweenPositions(p1, p2);

    switch (reach) {
      case WeaponReach.short: return distance.rank === 0 && distance.position <= 1;
      case WeaponReach.close: return distance.rank === 0 && distance.position <= 2;
      case WeaponReach.extended: return distance.rank <= 1;
      case WeaponReach.long: return true;
      default: throw new Error(`Bad reach value [${reach}]`);
    }
  }

  // Distance between positions returns an object with both rank difference and position difference as the rank
  // (vertical) distance is usually more significant than the position (horizontal) distance.
  function distanceBetweenPositions(p1, p2) {
    const m1 = p1.match(_positionPattern);
    const m2 = p2.match(_positionPattern);

    if (m1[1] !== m2[1]) {
      return {
        rank: parseInt(m1[2]) + parseInt(m2[2]),
        position: Math.abs(parseInt(m1[3]) - parseInt(m2[3])),
      }
    }

    throw new Error(`TODO: Distance between positions on same side.`);
  }

  function randomHitLocation() {
    return Random.fromFrequencyMap({
      chest: 35,
      feet:  15,
      hands: 15,
      head:  10,
      legs:  25,
    });
  }

  // I was kind of dumb and represented the attack and defend states in two different ways within the battle system.
  // The skill checks (which the attack and defend rolls use internally) return an object with crit and fumble
  // booleans, and the context objects that I use for the battle messages have the attack and defend types as strings.
  // In order for the abilities to use either format interchangeably this function takes either the string
  // representation or a roll and returns the string value.
  function getRollType(roll) {
    if (typeof roll === 'string') { return roll; }
    if (roll.isCrit()) { return 'crit'; }
    if (roll.isFumble()) { return 'fumble'; }
    return 'normal';
  }

  return Object.freeze({
    isAttackWithinRange,
    distanceBetweenPositions,
    randomHitLocation,
    getRollType,
  });

})();