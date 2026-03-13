global.BreastsScrutinizer = (function() {

  function getBreasts(key,context) {
    return BreastsComponent.lookup(context[key]);
  }

  function isValid(condition, key, context) {
    switch (condition) {
      case 'has-breasts': return getBreasts(key, context) != null;
      default: throw `Unknown Breasts Condition ${condition}`;
    }
  }

  return Object.freeze({ isValid });

})();