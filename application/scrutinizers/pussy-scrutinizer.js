global.PussyScrutinizer = (function() {

  // Currently this only looks at the normal pussy component on the character. Eventually, once we have nipple cunts
  // and such, we'll need the conditions to specify which pussy we're talking about.
  function getPussy(key,context) {
    return PussyComponent.lookupNormalOf(context[key]);
  }

  function isValid(condition, key, context) {
    switch (condition) {
      case 'has-pussy': return getPussy(key, context) != null;
      default: throw new Error(`Unknown Pussy Condition ${condition}`);
    }
  }

  return Object.freeze({ isValid });

})();
