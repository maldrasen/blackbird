global.UtilityLoom = (function() {

  function weave(token, argument) {
    throw `Unknown Utility Token (${token}|${argument})`;
  }

  return Object.freeze({ weave });

})();
