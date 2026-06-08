global.BattleHelper = (function() {

  // Distance between positions returns an object with both rank difference and position difference as the rank
  // (vertical) distance is usually more significant than the position (horizontal) distance.
  function distanceBetweenPositions(p1, p2) {
    const m1 = p1.match(/(\d)\.(\d)/);
    const m2 = p2.match(/(\d)\.(\d)/);

    return {
      rank: parseInt(m1[1]) + parseInt(m2[1]),
      position: Math.abs(parseInt(m1[2]) - parseInt(m2[2])),
    }
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

  return Object.freeze({
    distanceBetweenPositions,
    randomHitLocation,
  })

})();