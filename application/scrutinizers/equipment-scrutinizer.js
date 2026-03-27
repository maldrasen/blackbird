global.EquipmentScrutinizer = (function() {

  function isValid(condition, key, context) {
    if (condition === 'is-naked') { return Character(context[key]).isNaked(); }
    if (condition === 'not-naked') { return Character(context[key]).isNaked() === false; }
    throw new Error(`Unrecognized equipment condition (${condition})`);
  }

  return Object.freeze({ isValid });

})();
