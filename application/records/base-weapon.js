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
      getType: () => { return weapon.type; },
      getHands: () => { return weapon.hands; },
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
