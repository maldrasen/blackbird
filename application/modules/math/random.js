global.Random = (function() {

  const $stubQueues = { roll:[], rollDice:[], flipCoin:[], between:[], from:[] };

  function stubRoll(...values) { $stubQueues.roll.push(...values); }
  function stubRollDice(...values) { $stubQueues.rollDice.push(...values); }
  function stubFlipCoin(...values) { $stubQueues.flipCoin.push(...values); }
  function stubBetween(...values) { $stubQueues.between.push(...values); }
  function stubFrom(...values) { $stubQueues.from.push(...values); }

  function stubReset() {
    $stubQueues.roll = [];
    $stubQueues.rollDice = [];
    $stubQueues.flipCoin = [];
    $stubQueues.between = [];
    $stubQueues.from = [];
  }

  function stubbedValue(name, limits={}) {
    const value = $stubQueues[name].shift();

    if (limits.min != null && value < limits.min) {
      throw `Stubbed value ${value} is below minimum of ${limits.min}`; }
    if (limits.max != null && value > limits.max) {
      throw `Stubbed value ${value} is above maximum of ${limits.max}`; }
    if (limits.within != null && limits.within.includes(value) === false) {
      throw `Stubbed value ${value} was not within ${JSON.stringify(limits.within)}`;
    }

    return value;
  }

  // Random number between 0 and the limit exclusive, (meaning upTo(100) will
  // return between 0 and 99) plus an optional 'plus' value.
  function roll(limit, plus=0) {
    if ($stubQueues.roll.length > 0) { return stubbedValue('roll',{ min:plus, max:(limit+plus-1) }); }
    return Math.floor(Math.random() * limit) + plus;
  }

  // Simulate rolling dice. Options:
  //   { x:(dice count), d:(dice faces), p:(plus or minus) }
  function rollDice(options) {
    if ($stubQueues.rollDice.length > 0) { return stubbedValue('rollDice'); }

    let total = options.p || 0;
    for (let x = 0; x<(options.x || 1); x++) {
      total += Random.roll(options.d || 6) + 1;
    }

    return total;
  }

  // Boolean Heads or tails, 50% probability.
  function flipCoin() {
    if ($stubQueues.flipCoin.length > 0) { return stubbedValue('flipCoin'); }
    return Random.roll(2) === 0;
  }

  // Rolls between the new numbers inclusive, meaning min or max value could be
  // chosen.
  function between(min, max) {
    if ($stubQueues.between.length > 0) { return stubbedValue('between',{ min:min, max:max }); }
    return Random.roll(max-min+1,min);
  }

  // Select a random element in an array.
  function from(array) {
    if ($stubQueues.from.length > 0) { return stubbedValue('from',{ within:array }); }
    if (array && array.length) {
      return array[Random.roll(array.length)];
    } else {
      throw `Empty array`
    }
  }

  // Select a random value from a weighted frequency map. Frequency maps should
  // have the form:
  //
  //   { codeA:10, codeB:100, codeC:50 }
  //
  // It doesn't matter what the values of the keys add up to or what they are;
  // the ratios between the numbers determine the probability
  function fromFrequencyMap(map) {
    let index = 0;
    let keys = Object.keys(map);
    let random = Random.roll(Object.values(map).reduce(function(a,v) { return a+v; }));

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

  function testDistribution(average,deviation,iterations=100) {
    let max = -1000000;
    let min = 1000000

    for (let i=0; i<iterations; i++) {
      let x = Random.normalDistribution(average,deviation);
      if (x < min) { min = x; }
      if (x > max) { max = x; }
    }

    console.log(`Normal Distribution (${average},${deviation}) = [${min}-${max}]`)
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
    stubReset,

    stubRoll,
    stubRollDice,
    stubFlipCoin,
    stubBetween,
    stubFrom,

    roll,
    rollDice,
    flipCoin,
    between,
    from,

    fromFrequencyMap,
    normalDistribution,
    testDistribution,
    shuffle,
    identifier,
  });

})();
