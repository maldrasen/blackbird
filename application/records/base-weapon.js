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

    // Except for block, all the weapon skills just happen to be the weapon type +s
    function getSkill() {
      return (weapon.type === 'shield') ? 'block' : `${weapon.type}s`;
    }

    function getDamageTypes() {
      return weapon.damageTypes ? weapon.damageTypes : [{ type:weapon.damageType, percent:100 }];
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return weapon.name; },
      getType: () => { return weapon.type; },
      getSkill,
      getDamageTypes,
      getHands: () => { return weapon.hands; },
      getReach: () => { return weapon.reach || WeaponReach.close },
      getLow: () => { return weapon.low; },
      getHigh: () => { return weapon.high; },
      getSpeed: () => { return weapon.speed },
      getAttackText: () => { return weapon.attackText; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
