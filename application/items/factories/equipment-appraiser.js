
// Runs at the end of EquipmentFactory.build(). The item component can't be created without a value, so the appraiser
// works from the properties the factory has settled on rather than from an Item. A piece of equipment is worth what
// it cost to make, the materials plus the effort, nudged by a performance factor for how well it does its job.

global.EquipmentAppraiser = (function() {

  function appraise(item) {
    const base = BaseEquipment.lookup(item.base);
    const primaryMaterial = Object.keys(item.materials)[0];
    return Math.round(getConstructionCost(base, item.materials) * getPerformanceFactor(base, primaryMaterial));
  }

  function getConstructionCost(base, materials) {
    const materialCost = Object.entries(materials).reduce((sum, [code,amount]) => {
      return sum + (Material.lookup(code).getCost() * amount);
    }, 0);
    return materialCost + (base.getEffort() * ItemConstants.effortCost);
  }

  // Because a shield's reduction is applied over the entire body the reduction it provides is much more valuable than
  // a normal armor piece, giving shields a higher overall performance factor.
  function getPerformanceFactor(base, material) {
    if (base.isWeapon()) { return ItemHelper.getWeaponValueFactor(getDamagePerSecond(base, material)); }

    const factor = ItemHelper.getArmorValueFactor(getTotalReduction(base, material));
    return base.isShield() ? factor * 2 : factor;
  }

  function getDamagePerSecond(base, material) {
    const range = ItemHelper.getScaledDamageRange(base, material);
    return ((range.low + range.high) / 2) / (base.getSpeed() / 1000);
  }

  function getTotalReduction(base, material) {
    return [DamageType.crush, DamageType.slash, DamageType.pierce].reduce((total, type) => {
      return total + ItemHelper.getScaledReduction(base.getReductionMap(), material, type);
    }, 0);
  }

  return { appraise };

})();
