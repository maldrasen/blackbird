//
// It is my responsibility to enforce all the laws that haven't been passed yet.
//    - Frank Zappa
//
global.CentralScrutinizer = function(context) {
  const $context = context;

  const genderPattern = /(\w):gender\.([a-z-]*)/
  const speciesPattern = /(\w):species\.([a-z-]*)/
  const anusPattern = /(\w):([a-z-]*anus[a-z-]*)/
  const breastsPattern = /(\w):([a-z-]*breasts[a-z-]*)/
  const cockPattern = /(\w):([a-z-]*cock[a-z-]*)/
  const pussyPattern = /(\w):([a-z-]*pussy[a-z-]*)/

  const equipmentPattern = /(\w):equipment\.([a-z-]+)/

  function allConditionsPass(conditions) {
    for (const condition of (conditions||[])) {
      if (false === isValid(condition)) { return false; }
    }
    return true;
  }

  function anyConditionFails(conditions) {
    return allConditionsPass(conditions) === false;
  }

  function isValid(condition) {
    if (typeof condition === 'function') { return condition($context) }

    let match = condition.match(genderPattern);
    if (match) { return isGenderValid(match[2], match[1], context); }
    match = condition.match(speciesPattern);
    if (match) { return isSpeciesValid(match[2], match[1], context); }
    match = condition.match(anusPattern);
    if (match) { return AnusScrutinizer.isValid(match[2], match[1], context); }
    match = condition.match(breastsPattern);
    if (match) { return BreastsScrutinizer.isValid(match[2], match[1], context); }
    match = condition.match(cockPattern);
    if (match) { return CockScrutinizer.isValid(match[2], match[1], context); }
    match = condition.match(pussyPattern);
    if (match) { return PussyScrutinizer.isValid(match[2], match[1], context); }
    match = condition.match(equipmentPattern);
    if (match) { return EquipmentScrutinizer.isValid(match[2], match[1], context); }

    // TODO: Until bondage stuff is implemented.
    if (condition.match(/:unbound/)) { return true; }

    throw new Error(`Unrecognized condition: ${condition}`);
  }

  // TODO: I was going to use this, but then I realized that the these functions
  //   should only validate entities, not the plain objects that the factories use.
  function isGenderValid(requirement, key, context) { throw new Error(`Implement isGenderValid()`); }
  function isSpeciesValid(requirement, key, context) { throw new Error(`Implement isSpeciesValid()`); }

  return Object.freeze({
    allConditionsPass,
    anyConditionFails,
  });

}
