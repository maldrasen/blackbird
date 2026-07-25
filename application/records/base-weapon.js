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
    const reduction = HasReduction(weapon);

    // Except for martial arts and block, all the weapon skills are weapon type +s
    function getSkill() {
      if (weapon.type === 'shield') { return 'block'; }
      if (weapon.type === 'fist') { return 'martial-arts'; }
      return `${weapon.type}s`;
    }

    function getDamageTypes() {
      return weapon.damageTypes ? weapon.damageTypes : [{ type:weapon.damageType, percent:100 }];
    }

    function getMaterialParts() {
      return Object.entries(weapon.materials || {}).map(([part,entry]) => ({ part, ...entry }));
    }

    function getPrimaryMaterial() {
      const parts = getMaterialParts();
      return parts.length ? parts[0].material : null;
    }

    function getDamageStat() {
      switch (weapon.type) {
        case 'whip': return MaterialFactor.lash;
        case 'bow': return MaterialFactor.tension;
        default: return MaterialFactor.sharpness;
      }
    }

    function damageTypeFactor(type) {
      const statKey = (type === DamageType.crush) ? MaterialFactor.heft : getDamageStat();
      return Material.getFactor(getPrimaryMaterial(),statKey);
    }

    function getDamageFactor() {
      if (getPrimaryMaterial() == null) { return 1; }
      return getDamageTypes().reduce((blend,dt) => {
        return blend + ((dt.percent / 100) * damageTypeFactor(dt.type));
      }, 0);
    }

    function getLow() { return Math.round(weapon.low * getDamageFactor()); }
    function getHigh() { return Math.round(weapon.high * getDamageFactor()); }

    function getDamagePerSecond() {
      const average = (getLow() + getHigh()) / 2;
      return average / (weapon.speed / 1000);
    }

    function getMaterialCost() {
      return getMaterialParts().reduce((sum,entry) => sum + (Material.getCost(entry.material) * entry.amount), 0);
    }

    // A shield's value comes from both it's reduction and the damage it can do. Because the shield's reduction is
    // applied over the entire body the reduction it provides is much more valuable than a normal armor piece, giving
    // shields a higher overall performance factor.
    function getPerformanceFactor() {
      if (weapon.type !== 'shield') { return ItemHelper.getWeaponValueFactor(getDamagePerSecond()); }

      return (1.5 * ItemHelper.getArmorValueFactor(reduction.getTotalReduction()))
           + (0.5 * ItemHelper.getWeaponValueFactor(getDamagePerSecond()));
    }

    function getValue() {
      const construction = getMaterialCost() + ((weapon.effort || 0) * _effortCost);
      return Math.round(construction * getPerformanceFactor());
    }

    return Object.freeze({
      ...reduction,
      getCode: () => { return code; },
      getName: () => { return weapon.name; },
      getIcon: () => { return weapon.icon; },
      getType: () => { return weapon.type; },
      getSkill,
      getDamageTypes,
      getHands: () => { return weapon.hands; },
      getReach: () => { return weapon.reach || WeaponReach.close },
      getLow,
      getHigh,
      getSpeed: () => { return weapon.speed },
      getDamagePerSecond,
      getMaterials: () => { return weapon.materials || {}; },
      getMaterialParts,
      getPrimaryMaterial,
      getDamageStat,
      getDamageFactor,
      getEffort: () => { return weapon.effort || 0; },
      getValue,
      getTextKey: () => { return weapon.textKey; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
