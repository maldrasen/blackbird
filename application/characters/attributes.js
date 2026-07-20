global.Attributes = function(argument) {
  const attributes = (typeof argument === 'object') ? argument : AttributesComponent.lookup(argument);

  // Stamina is entirely vitality based.
  //   Low vitality is 1d10, or around 5, Low stamina is 3000. That's 600 stamina per point of vitality.
  //   Average vitality 3d10, or around 15. Average stamina is 6000. That's 400 stamina per point of vitality.
  //   Max stamina should be 10,000. Max vitality is 100, which is 100 stamina per point.
  // The formula below approximates that curve.
  function getMaxStamina() {
    return Math.floor(-146738.78 / (attributes.vitality + 12.674) + 11302.33);
  }

  return Object.freeze({
    getStrength: () => { return attributes.strength; },
    getDexterity: () => { return attributes.dexterity; },
    getVitality: () => { return attributes.vitality; },
    getIntelligence: () => { return attributes.intelligence; },
    getBeauty: () => { return attributes.beauty; },
    getMaxStamina,
  });

}