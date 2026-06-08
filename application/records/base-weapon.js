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

    return Object.freeze({
      getCode: () => { return weapon.code; },
      getName: () => { return weapon.name; },
      getType: () => { return weapon.type; },
      getSkill,
      getDamageType: () => { return weapon.damageType; },
      getHands: () => { return weapon.hands; },
      getReach: () => { return weapon.reach || WeaponReach.close },
      getLow: () => { return weapon.low; },
      getHigh: () => { return weapon.high; },
      getAttackText: () => { return weapon.attackText; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
