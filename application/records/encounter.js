global.Encounter = (function() {
  const $encounters = {};

  function register(code,data) {
    $encounters[code] = data;
  }

  function getAllCodes() {
    return Object.keys($encounters);
  }

  function lookup(code) {
    if ($encounters[code] == null) { throw new Error(`Bad encounter code [${code}]`); }

    const encounter = { ...$encounters[code] };

    function chooseMonsters() {
      console.log("Choosing Monsters");
      console.log(encounter.ranks);
      console.log(encounter.monsters);
    }

    return Object.freeze({
      getCode: () => { return code; },
      chooseMonsters,
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
