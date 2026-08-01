global.BaseWeapon = (function() {
  const weapons = {};

  function register(code,data) {
    weapons[code] = data;
  }

  function getAllCodes() {
    return Object.keys(weapons);
  }

  // An item instance can override the material its primary part is made from, changing the damage, reduction, and
  // value calculations below. A bone tipped spear pierces at bone's sharpness, not steel's.
  function lookup(code, options={}) {
    if (weapons[code] == null) { throw new Error(`Bad base weapon code [${code}]`); }

    const weapon = { ...weapons[code] };
    if (options.material) {
      weapon.materials = ItemHelper.substitutePrimaryMaterial(weapon.materials, options.material);
    }
    const materials = HasMaterials(weapon);
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

    function getDamageStat() {
      switch (weapon.type) {
        case 'whip': return MaterialFactor.lash;
        case 'bow': return MaterialFactor.tension;
        default: return MaterialFactor.sharpness;
      }
    }

    function damageTypeFactor(type) {
      const statKey = (type === DamageType.crush) ? MaterialFactor.heft : getDamageStat();
      return Material.getFactor(materials.getPrimaryMaterial(),statKey);
    }

    function getDamageFactor() {
      if (materials.getPrimaryMaterial() == null) { return 1; }
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

    // A shield's value comes from both it's reduction and the damage it can do. Because the shield's reduction is
    // applied over the entire body the reduction it provides is much more valuable than a normal armor piece, giving
    // shields a higher overall performance factor.
    function getPerformanceFactor() {
      if (weapon.type !== 'shield') { return ItemHelper.getWeaponValueFactor(getDamagePerSecond()); }

      return (1.5 * ItemHelper.getArmorValueFactor(reduction.getTotalReduction()))
           + (0.5 * ItemHelper.getWeaponValueFactor(getDamagePerSecond()));
    }

    function getValue() {
      const construction = materials.getMaterialCost() + ((weapon.effort || 0) * _effortCost);
      return Math.round(construction * getPerformanceFactor());
    }

    return Object.freeze({
      ...materials,
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
