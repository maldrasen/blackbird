global.BaseWeapon = (function() {
  const $weapons = {};

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
      getName: () => { return weapon.name; },
      getType: () => { return weapon.type; },
      getDamageType: () => { return weapon.damageType; },
      getHands: () => { return weapon.hands; },
      getReach: () => { return weapon.reach || WeaponReach.close },
      getLow: () => { return weapon.low; },
      getHigh: () => { return weapon.high; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
