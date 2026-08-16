global.Attributes = function(argument) {
  const attributes = (typeof argument === 'object') ? argument : AttributesComponent.lookup(argument);

  function getAttribute(code) {
    if (Attrib[code] == null) { throw new Error(`Unknown attribute (${code})`); }
    return attributes[code];
  }

  // An attribute check is a very simplified version of a skill check. Unlike the skill checks, attribute checks don't
  // have crits or fumbles, they only work off of a single attribute, and don't have any factors like the skill factor.
  function check(code) {
    const value = getAttribute(code);
    const plus = Math.floor(value * 0.25);
    const rand = Math.ceil(value * 0.75);
    return Random.between(1,rand) + plus;
  }

  // Stamina is entirely vitality based.
  //    Even though there's no cap on vitality, low vitality is around 5. A low stamina would be around 3000. That's
  //    600 stamina per point of vitality. At 15 vitality average stamina is 6000. That's 400 stamina per point of
  //    vitality. At 100 vitality, you get 100 stamina per point. So stamina gains slow as vitality increases. The
  //    formula below approximates that curve.
  function getMaxStamina() {
    return Math.floor(-146738.78 / (getAttribute(Attrib.vitality) + 12.674) + 11302.33);
  }

  return {
    getAttribute,
    getStrength: () => { return getAttribute(Attrib.strength); },
    getDexterity: () => { return getAttribute(Attrib.dexterity); },
    getVitality: () => { return getAttribute(Attrib.vitality); },
    getIntelligence: () => { return getAttribute(Attrib.intelligence); },
    getBeauty: () => { return getAttribute(Attrib.beauty); },
    getMaxStamina,
    check,
  };
}
