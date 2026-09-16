global.BaseWeapon = (function() {
  const weapons = {};

  function register(code,data) {
    weapons[code] = data;
  }

  function getAllCodes() {
    return Object.keys(weapons);
  }

  function lookup(code) {
    if (weapons[code] == null) { throw new Error(`Bad base weapon code [${code}]`); }

    const weapon = { ...weapons[code] };

    function getSkill() {
      return weapon.type === 'shield' ? 'block' : `${weapon.type}s`;
    }

    function getDamageTypes() {
      return weapon.damageTypes ? weapon.damageTypes : [{ type:weapon.damageType, percent:100 }];
    }

    function getDamageStat() {
      switch (weapon.type) {
        case 'whip': return MaterialFactor.lash;
        case 'bow': return MaterialFactor.tension;
        default: return MaterialFactor.sharpness;
      }
    }

    function getName(materials) {
      const materialNames = Object.keys(materials).map(key => StringHelper.titlecase(Material.lookup(key).getName()));
      return weapon.nameFunction ? weapon.nameFunction(materialNames,materials) : weapon.name;
    }

    return {
      getCode: () => { return code; },
      getName,
      getIcon: () => { return weapon.icon; },
      getType: () => { return weapon.type; },
      getSkill,
      getDamageTypes,
      getHands: () => { return weapon.hands; },
      getReach: () => { return weapon.reach || WeaponReach.close },
      getSpeed: () => { return weapon.speed },
      getDamageStat,
      getEffort: () => { return weapon.effort || 0; },
      getTextKey: () => { return weapon.textKey; },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
