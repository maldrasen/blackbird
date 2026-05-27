global.UtilityLoom = (function() {

  function weave(token, argument) {
    return Weaver.formatWarning(`[Utility:${token}|${argument}]`);
  }

  return Object.freeze({ weave });

})();
