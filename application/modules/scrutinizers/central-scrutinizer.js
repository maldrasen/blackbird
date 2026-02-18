//
// It is my responsibility to enforce all the laws that haven't been passed yet.
//    - Frank Zappa
//
global.CentralScrutinizer = function(context) {
  const $context = context;

  const breastsPattern = /(\w):([a-z-]*breasts[a-z-]*)/
  const cockPattern = /(\w):([a-z-]*cock[a-z-]*)/
  const pussyPattern = /(\w):([a-z-]*pussy[a-z-]*)/

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

    let match = condition.match(breastsPattern);
    if (match) { return BreastsScrutinizer.isValid(match[2], match[1], context); }
    match = condition.match(cockPattern);
    if (match) { return CockScrutinizer.isValid(match[2], match[1], context); }
    match = condition.match(pussyPattern);
    if (match) { return PussyScrutinizer.isValid(match[2], match[1], context); }

    throw `Unrecognized condition: ${condition}`;
  }

  return Object.freeze({
    allConditionsPass,
    anyConditionFails,
  });

}
