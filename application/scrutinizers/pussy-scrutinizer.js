global.PussyScrutinizer = (function() {

  // Currently this only looks at the first pussy component on the character. Eventually, once we have nipple cunts and
  // such, we'll need the conditions to specify which pussy we're talking about.
  function getPussy(key,context) {
    const pussies = PussyComponent.of(context[key]);
    if (pussies && pussies[0]) {
      return PussyComponent.lookup(pussies[0]);
    }
  }

  function isValid(condition, key, context) {
    switch (condition) {
      case 'has-pussy': return getPussy(key, context) != null;
      default: throw `Unknown Pussy Condition ${condition}`;
    }
  }

  return Object.freeze({ isValid });

})();
