global.CockLoom = (function() {

  function weave(id, token) {
    throw `Unknown Cock Token (${token})`;
  }

  return Object.freeze({ weave });

})();
