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

    // Except for martial arts and block, all the weapon skills are weapon type +s
    function getSkill() {
      if (weapon.type === 'shield') { return 'block'; }
      if (weapon.type === 'fist') { return 'martial-arts'; }
      return `${weapon.type}s`;
    }

    function getDamageTypes() {
      return weapon.damageTypes ? weapon.damageTypes : [{ type:weapon.damageType, percent:100 }];
    }

    // Materials is an object keyed by the part it makes up ({ blade:{...}, grip:{...} }). The first part listed is the
    // primary, damage-bearing part - its material is the one that decides how sharp or pointed the weapon is.
    function getMaterialParts() {
      return Object.entries(weapon.materials || {}).map(([part,entry]) => ({ part, ...entry }));
    }

    function getPrimaryMaterial() {
      const parts = getMaterialParts();
      return parts.length ? parts[0].material : null;
    }

    // The material factor that scales this weapon's slash and pierce (edge) damage. Whips ride on the lash of their
    // cord or chain, bows on the tension of their stave, and everything else on the sharpness of its blade or point.
    // Crush damage does not use this - it has its own heft factor (see getDamageFactor).
    function getDamageStat() {
      switch (weapon.type) {
        case 'whip': return MaterialFactor.lash;
        case 'bow': return MaterialFactor.tension;
        default: return MaterialFactor.sharpness;
      }
    }

    // The material factor for a single damage type: crush rides on the material's heft, slash and pierce on the
    // weapon's edge stat.
    function damageTypeFactor(type) {
      const statKey = (type === DamageType.crush) ? MaterialFactor.heft : getDamageStat();
      return Material.getFactor(getPrimaryMaterial(),statKey);
    }

    // The low and high numbers describe the damage for the weapon's shape. That shape damage is then scaled by the
    // primary material's relevant factor. We blend the factor across the weapon's damage types, so a mixed crush and
    // pierce head is only partly affected by, say, the sharpness of its steel.
    function getDamageFactor() {
      if (getPrimaryMaterial() == null) { return 1; }
      return getDamageTypes().reduce((blend,dt) => {
        return blend + ((dt.percent / 100) * damageTypeFactor(dt.type));
      }, 0);
    }

    function getLow() { return Math.round(weapon.low * getDamageFactor()); }
    function getHigh() { return Math.round(weapon.high * getDamageFactor()); }

    // Average damage per second, treating speed as the time in milliseconds between attacks.
    function getDamagePerSecond() {
      const average = (getLow() + getHigh()) / 2;
      return average / (weapon.speed / 1000);
    }

    // Value is derived from how the weapon is built rather than stored on the record: the cost of its materials plus
    // the labor to forge it. This is why a big steel sword costs far more than a spear that is mostly a wooden shaft -
    // more metal and more effort both push the price up.
    function getMaterialCost() {
      return getMaterialParts().reduce((sum,entry) => sum + (Material.getCost(entry.material) * entry.amount), 0);
    }

    function getValue() {
      const raw = getMaterialCost() + ((weapon.effort || 0) * _effortCost);
      return Math.round(raw / 5) * 5;
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return weapon.name; },
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
