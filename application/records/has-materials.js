
// Mixin for records built out of materials, mixed in the same way as HasReduction. Materials is an object keyed by
// the part it makes up ({ body:{...}, backing:{...} }, { blade:{...}, grip:{...} }). The first part listed is the
// primary one - its material is what scales a weapon's damage or an armor's reduction.

global.HasMaterials = function(item) {

  function getMaterials() {
    return item.materials || {};
  }

  function getMaterialParts() {
    return Object.entries(item.materials || {}).map(([part,entry]) => ({ part, ...entry }));
  }

  function getPrimaryMaterial() {
    const parts = getMaterialParts();
    return parts.length ? parts[0].material : null;
  }

  function getMaterialCost() {
    return getMaterialParts().reduce((sum,entry) => sum + (Material.getCost(entry.material) * entry.amount), 0);
  }

  return {
    getMaterials,
    getMaterialParts,
    getPrimaryMaterial,
    getMaterialCost,
  };
}
