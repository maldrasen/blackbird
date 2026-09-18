
// Runs at the end of EquipmentFactory.build() and will write a value onto the item component (task 213). The sketches
// below came off the old weapon and armor records and are the starting point.

global.EquipmentAppraiser = (function() {

  function appraise(itemProperties) {
    return 100;
  }

  // function getWeaponValue() {
  //   const construction = materials.getMaterialCost() + ((weapon.effort || 0) * _effortCost);
  //   return Math.round(construction * getPerformanceFactor());
  // }
  //
  // function getArmorValue() {
  //   const construction = materials.getMaterialCost() + ((armor.effort || 0) * _effortCost);
  //   const performance = ItemHelper.getArmorValueFactor(reduction.getTotalReduction());
  //   return Math.round((construction * performance) / 5) * 5;
  // }

  // A shield's value comes from both it's reduction and the damage it can do. Because the shield's reduction is
  // applied over the entire body the reduction it provides is much more valuable than a normal armor piece, giving
  // shields a higher overall performance factor.
  // function getPerformanceFactor() {
  //   return (weapon.type !== 'shield') ?
  //     ItemHelper.getWeaponValueFactor(getDamagePerSecond()) :
  //     (ItemHelper.getArmorValueFactor(reduction.getTotalReduction()) * 2);
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
