global.EquipmentAppraiser = (function() {

  // TODO: We also need to take the enchantment cost into consideration. I was thinking that the enchantments could be
  //       priced like the articles, but the enchantments have a different shape entirely. Some enchantments could be
  //       very simple, like add a flat damage percentage to a weapon. Other enchantments like endanger though would
  //       probably need their own formula. Vulnerable is a valuable affliction, but if it can only ever be applied to
  //       chickens or something, then it's actually not that useful. I think before we can really appraise
  //       enchantments we need more enchantments to be in the game.

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
    return base.isShield() ? factor * 3 : factor;
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
