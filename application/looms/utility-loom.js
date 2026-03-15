global.UtilityLoom = (function() {

  function weave(token, argument) {
    return `<span class='weaver-warning'>Utility:[${token}:${argument}]</span>`
  }

  return Object.freeze({ weave });

})();
