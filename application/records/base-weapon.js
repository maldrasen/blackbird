global.BaseWeapon = (function() {
  const $weapons = {};

  // The skill register() function also needs to add the skill code as a property of the Skills component.
  function register(code,data) {
    $weapons[code] = data;
  }

  function getAllCodes() {
    return Object.keys($weapons);
  }

  function lookup(code) {
    if ($weapons[code] == null) { throw new Error(`Bad base weapon code [${code}]`); }

    const weapon = { ...$weapons[code] };

    return Object.freeze({
      getCode: () => { return weapon.code; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
