
// Mixin for records whose items turn away physical damage - armor, and weapons in the case of shields. Records mix
// it in by calling it with the raw record data inside lookup(), then spreading the shared functions into the object
// that lookup() returns:
//
//   const reduction = HasReduction(armor);
//   return Object.freeze({ ...reduction, getCode, ... });
//
// The reduction profile describes how much of each physical damage type the item's shape turns away at steel
// quality, scaled by how well the primary (first listed) material actually absorbs a blow. The same breastplate
// shape protects far less when it is boiled leather instead of steel plate.

global.HasReduction = function(item) {
  const materials = HasMaterials(item);

  function getReduction(type) {
    return ItemHelper.getScaledReduction(item.reduction, materials.getPrimaryMaterial(), type);
  }

  function getReductionMap() {
    const map = {};
    [DamageType.crush, DamageType.slash, DamageType.pierce].forEach(type => { map[type] = getReduction(type); });
    return map;
  }

  function getTotalReduction() {
    const reduction = getReductionMap();
    return reduction[DamageType.crush] + reduction[DamageType.slash] + reduction[DamageType.pierce];
  }

  return {
    getReduction,
    getReductionMap,
    getTotalReduction,
  };
}
