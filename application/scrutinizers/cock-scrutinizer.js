global.CockScrutinizer = (function() {

  // Currently this only looks at the first cock component on the character. Eventually, once we have nipple cocks and
  // tongue cocks, we'll need the conditions to specify which cock we're talking about.
  function getCock(key,context) {
    const cocks = CockComponent.of(context[key]);
    if (cocks && cocks[0]) {
      return CockComponent.lookup(cocks[0]);
    }
  }

  function isValid(condition, key, context) {
    switch (condition) {
      case 'has-cock': return getCock(key, context) != null;
      default: throw `Unknown Cock Condition ${condition}`;
    }
  }

  return Object.freeze({ isValid });

})();