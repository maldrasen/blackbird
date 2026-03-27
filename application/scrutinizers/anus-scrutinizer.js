global.AnusScrutinizer = (function() {

  function isValid(condition, key, context) {
    switch (condition) {
      default: throw new Error(`Unknown Anus Condition ${condition}`);
    }
  }

  return Object.freeze({ isValid });

})();