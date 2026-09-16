global.ArmorAppraiser = (function() {

  function appraise(id) {

  }

  // function getValue() {
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

  // const materials = HasMaterials(armor);
  // const reduction = HasReduction(armor);

  // As with BaseWeapon, a variant is a derived record with the primary part's material swapped, registered in the
  // same data file as its base, after it.
  // function registerVariant(code, baseCode, options) {
  //   if (armors[baseCode] == null) { throw new Error(`Bad base armor code [${baseCode}]`); }
  //
  //   const base = armors[baseCode];
  //   armors[code] = {
  //     ...base,
  //     name: options.name || `${options.material} ${base.name}`,
  //     materials: ItemHelper.substitutePrimaryMaterial(base.materials, options.material),
  //   };
  // }


  return { appraise }

})();
