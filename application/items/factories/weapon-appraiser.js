global.WeaponAppraiser = (function() {

  function appraise(id) {

  }
  // const materials = HasMaterials(weapon);
  // const reduction = HasReduction(weapon);

  // function getValue() {
  //   const construction = materials.getMaterialCost() + ((weapon.effort || 0) * _effortCost);
  //   return Math.round(construction * getPerformanceFactor());
  // }


  // No longer a thing...

  // A variant is a registered record derived from another: the same weapon with the primary part's material swapped.
  // Variants are real records - immutable, canonical, and listed in getAllCodes() - so a bone spear hits and prices
  // at bone quality everywhere. Unless a name is given, the variant names itself after its material ("bone spear").
  // Register a variant in the same data file as its base, after it, so the base always exists first.
  // function registerVariant(code, baseCode, options) {
  //   if (weapons[baseCode] == null) { throw new Error(`Bad base weapon code [${baseCode}]`); }
  //
  //   const base = weapons[baseCode];
  //   weapons[code] = {
  //     ...base,
  //     name: options.name || `${options.material} ${base.name}`,
  //     materials: ItemHelper.substitutePrimaryMaterial(base.materials, options.material),
  //   };
  // }



  // The weapon needs these...

  // function damageTypeFactor(type) {
  //   const statKey = (type === DamageType.crush) ? MaterialFactor.heft : getDamageStat();
  //   return Material.getFactor(materials.getPrimaryMaterial(),statKey);
  // }
  //
  // function getDamageFactor() {
  //   if (materials.getPrimaryMaterial() == null) { return 1; }
  //   return getDamageTypes().reduce((blend,dt) => {
  //     return blend + ((dt.percent / 100) * damageTypeFactor(dt.type));
  //   }, 0);
  // }
  //
  // function getLow() { return Math.round(weapon.low * getDamageFactor()); }
  // function getHigh() { return Math.round(weapon.high * getDamageFactor()); }
  //
  // function getDamagePerSecond() {
  //   const average = (getLow() + getHigh()) / 2;
  //   return average / (weapon.speed / 1000);
  // }




  return { appraise }

})();
