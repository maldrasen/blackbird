global.BreastsScrutinizer = (function() {

  function getBreasts(key,context) {
    return BreastsComponent.lookup(context[key]);
  }

  function isValid(condition, key, context) {
    if (condition.match(/at-least/)) { return checkAtLeast(key, condition, context); }

    switch (condition) {
      case 'has-breasts': return getBreasts(key, context) != null;
      default: throw `Unknown Breasts Condition ${condition}`;
    }
  }

  function checkAtLeast(key, condition, context) {
    const sizes = Object.keys(BreastData.BreastSizes);
    const size = condition.match(/at-least-(\w+)/)[1];

    const breasts = BreastsComponent.lookup(context[key]);
    if (breasts == null) { return false; }

    const targetIndex = sizes.indexOf(size);
    const currentIndex = sizes.indexOf(breasts.breastSize);
    if (targetIndex < 0) { throw `Bad breast size (${size})`; }

    return currentIndex >= targetIndex
  }

  return Object.freeze({ isValid });

})();
