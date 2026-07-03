global.CockScrutinizer = (function() {

  // Currently this only looks at the normal cock component on the character. Eventually, once we have nipple cocks
  // and tongue cocks, we'll need the conditions to specify which cock we're talking about.
  function getCock(key,context) {
    return CockComponent.lookupNormalOf(context[key]);
  }

  function isValid(condition, key, context) {
    switch (condition) {
      case 'has-cock': return getCock(key, context) != null;
      default: throw new Error(`Unknown Cock Condition ${condition}`);
    }
  }

  return Object.freeze({ isValid });

})();