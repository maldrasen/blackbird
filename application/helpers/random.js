global.Random = (function() {

  // ===============================================
  //    Mulberry32 Pseudo Random Number Generator
  // ===============================================
  // This technique is used to achieve deterministic randomness. A run can be reproduced exactly by recording the seed
  // then every run that uses the same seed will produce the same random numbers.

  let $seed = generateSeed();

  function generateSeed() {
    return (Date.now() ^ Math.floor(Math.random() * 0xFFFFFFFF)) >>> 0;
  }

  function nextFloat() {
    $seed = ($seed + 0x6D2B79F5) | 0;
    let t = Math.imul($seed ^ ($seed >>> 15), 1 | $seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function seed(value) { $seed = value >>> 0; return $seed; }
  function getSeed() { return $seed; }
  function reseed() { return seed(generateSeed()); }

  // ==================
  //    Random Stubs
  // ==================
  // These stubs are used by the specs when we want to specify the values that the Random number functions would
  // produce. A queue starts out undefined, meaning it hasn't been stubbed and real random values are used. Once a
  // stub* function is called it becomes a real (possibly empty) array, and stays in play for the rest of the spec: if
  // it runs dry the spec is relying on more random calls than it stubbed, so we throw instead of quietly falling back
  // to real randomness.

  const $stubQueues = { roll:undefined, rollDice:undefined, flipCoin:undefined, between:undefined, from:undefined };

  function stubQueue(name) {
    if ($stubQueues[name] == null) { $stubQueues[name] = []; }
    return $stubQueues[name];
  }

  function stubRoll(...values) { stubQueue('roll').push(...values); }
  function stubRollDice(...values) { stubQueue('rollDice').push(...values); }
  function stubFlipCoin(...values) { stubQueue('flipCoin').push(...values); }
  function stubBetween(...values) { stubQueue('between').push(...values); }
  function stubFrom(...values) { stubQueue('from').push(...values); }

  function stubReset() {
    $stubQueues.roll = undefined;
    $stubQueues.rollDice = undefined;
    $stubQueues.flipCoin = undefined;
    $stubQueues.between = undefined;
    $stubQueues.from = undefined;
  }

  function stubbedValue(name, limits={}) {
    if ($stubQueues[name].length === 0) {
      throw new Error(`Random.${name}() ran out of stubbed values`);
    }

    const value = $stubQueues[name].shift();

    if (limits.min != null && value < limits.min) {
      throw new Error(`Stubbed value ${value} is below minimum of ${limits.min}`); }
    if (limits.max != null && value > limits.max) {
      throw new Error(`Stubbed value ${value} is above maximum of ${limits.max}`); }
    if (limits.within != null && limits.within.includes(value) === false) {
      throw new Error(`Stubbed value ${value} was not within ${JSON.stringify(limits.within)}`);
    }

    return value;
  }

  // ======================
  //    Random Functions
  // ======================

  // Random number between 0 and the limit exclusive, (meaning upTo(100) will
  // return between 0 and 99) plus an optional 'plus' value.
  function roll(limit, plus=0) {
    if ($stubQueues.roll != null) { return stubbedValue('roll',{ min:plus, max:(limit+plus-1) }); }
    return Math.floor(nextFloat() * limit) + plus;
  }

  // Simulate rolling dice. Options:
  //   { x:(dice count), d:(dice faces), p:(plus or minus) }
  function rollDice(options) {
    if ($stubQueues.rollDice != null) { return stubbedValue('rollDice'); }

    let total = options.p || 0;
    for (let x = 0; x<(options.x || 1); x++) {
      total += Random.roll(options.d || 6) + 1;
    }

    return total;
  }

  // Boolean Heads or tails, 50% probability.
  function flipCoin() {
    if ($stubQueues.flipCoin != null) { return stubbedValue('flipCoin'); }
    return Random.roll(2) === 0;
  }

  // Rolls between the new numbers inclusive, meaning min or max value could be
  // chosen.
  function between(min, max) {
    if (max === min) { return min; }
    if (max < min) { throw new Error(`Min(${min}) should be less than Max(${max})`); }
    if ($stubQueues.between != null) { return stubbedValue('between',{ min:min, max:max }); }
    return Random.roll(max-min+1,min);
  }

  // Select a random element in an array.
  function from(array) {
    if ($stubQueues.from != null) { return stubbedValue('from',{ within:array }); }
    if (array && array.length) {
      return array[Random.roll(array.length)];
    } else {
      throw new Error(`Empty array`);
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

    throw new Error('Invalid frequency map');
  }

  // Normal distribution using the Box–Muller transform
  function normalDistribution(average, deviation) {
    const multiplier = Math.sqrt(-2.0 * Math.log(nextFloat())) * Math.cos(2.0 * Math.PI * nextFloat());
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
      const j = Math.floor(nextFloat() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Create a new random identifier for an entity.
  function identifier() {
    return (nextFloat() + 1).toString(36).substring(2,10).toUpperCase();
  }

  return Object.freeze({
    seed,
    getSeed,
    reseed,

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
