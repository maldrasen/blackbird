global.Attributes = function(argument) {
  const attributes = (typeof argument === 'object') ? argument : AttributesComponent.lookup(argument);

  // Stamina is entirely vitality based.
  //    Even though there's no cap on vitality, low vitality is around 5. A low stamina would be around 3000. That's
  //    600 stamina per point of vitality. At 15 vitality average stamina is 6000. That's 400 stamina per point of
  //    vitality. At 100 vitality, you get 100 stamina per point. So stamina gains slow as vitality increases. The
  //    formula below approximates that curve.
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
