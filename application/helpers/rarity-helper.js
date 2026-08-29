global.RarityHelper = (function() {

  const standardWeights = {
    [Rarity.common]: 200,
    [Rarity.unusual]: 50,
    [Rarity.rare]: 16,
    [Rarity.astonishing]: 4,
    [Rarity.unheardOf]: 1,
  }

  function getOrder() {
    return Object.keys(Rarity);
  }

  // Both the features and the room contents are using the same weights for now, though it's possible that other
  // systems with rarity (such as loot generation) may want to use a different weight map. I'm including an optional
  // placeholder parameter for now in case we ever want to use a non-standard weight map in the future.
  function rollRarity(type='standard') {
    return Random.fromFrequencyMap(standardWeights);
  }

  return {
    getOrder,
    rollRarity,
  }

})();
