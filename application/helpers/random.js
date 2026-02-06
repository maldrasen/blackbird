global.Random = (function() {

  // Random number between 0 and the limit exclusive, meaning upTo(100) will
  // return between 0 and 99.
  function upTo(limit) {
    return Math.floor(Math.random() * limit);
  }

  // Roll 1d(rand) + plus.
  function roll(rand, plus=0) {
    return Random.upTo(rand)+plus;
  }

  // Simulate rolling dice. Options:
  //   { x:(dice count), d:(dice faces), p:(plus or minus) }
  function rollDice(options) {
    let total = options.p || 0;
    for (let x = 0; x<(options.x || 1); x++) {
      total += Random.roll(options.d || 6) + 1;
    }
    return total;
  }

  // Boolean Heads or tails, 50% probability.
  function flipCoin() {
    return Random.roll(2) === 0;
  }

  // Rolls between the new numbers inclusive, meaning min or max value could be
  // chosen.
  function between(min, max) {
    return Random.roll(max-min+1,min);
  }

  // Select a random element in an array.
  function from(array) {
    if (array && array.length) {
      return array[Random.upTo(array.length)];
    } else {
      throw `Empty array`
    }
  }

  // Select a random value from a weighted frequency map. Frequency maps should
  // have the form:
  //
  //   { codeA:10, codeB:100, codeC:50 }
  //
  // It doesn't matter what the values of the keys add up to or what they are
  // the ratios between the numbers determine the probability
  function fromFrequencyMap(map) {
    let index = 0;
    let keys = Object.keys(map);
    let random = Random.upTo(Object.values(map).reduce(function(a,v) { return a+v; }));

    for (let i=0; i<keys.length; i++) {
      index += map[keys[i]];
      if (random < index) {
        return keys[i];
      }
    }

    throw 'Invalid frequency map';
  }

  // Normal distribution using the Box–Muller transform
  function normalDistribution(average, deviation) {
    const multiplier = Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
    return Math.round(average + (multiplier * deviation));
  }

  // Randomize an array, usually so it can be iterated through in a random order.
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function identifier() {
    return (Math.random() + 1).toString(36).substring(2,10).toUpperCase();
  }

  return Object.freeze({
    upTo,
    roll,
    rollDice,
    flipCoin,
    between,
    from,
    fromFrequencyMap,
    normalDistribution,
    shuffle,
    identifier,
  });

})();
