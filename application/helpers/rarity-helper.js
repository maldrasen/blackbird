global.RarityHelper = (function() {

  const standardWeights = {
    [Rarity.common]: 200,
    [Rarity.unusual]: 50,
    [Rarity.rare]: 16,
    [Rarity.astonishing]: 4,
    [Rarity.unheardOf]: 1,
  }

  const colors = {
    [Rarity.common]:      `rgb(168 168 168)`,
    [Rarity.unusual]:     `rgb(157 156 97)`,
    [Rarity.rare]:        `rgb(92 170 82)`,
    [Rarity.astonishing]: `rgb(58 151 185)`,
    [Rarity.unheardOf]:   `rgb(132 41 201)`,
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

  function rollRarityIndex(type='standard') {
    return getOrder().indexOf(rollRarity(type));
  }

  // Picks one of the candidates by rolling a rarity, then choosing among the candidates of that rarity. When nothing
  // was offered at the rolled rarity the pick steps down through the commoner rarities, then up through the rarer
  // ones, so something is always picked when anything was offered. Each candidate carries its own { rarity }.
  function pickByRarity(candidates) {
    if (candidates.length === 0) { return null; }

    const order = getOrder();
    const index = rollRarityIndex();
    const tiers = [];
    for (let tier=index; tier>=0; tier--) { tiers.push(order[tier]); }
    for (let tier=index+1; tier<order.length; tier++) { tiers.push(order[tier]); }

    for (const rarity of tiers) {
      const matches = candidates.filter(candidate => candidate.rarity === rarity);
      if (matches.length > 0) { return Random.from(matches); }
    }
  }

  return {
    getColor: (rarity) => { return colors[rarity] },
    getOrder,
    rollRarity,
    rollRarityIndex,
    pickByRarity,
  }

})();
