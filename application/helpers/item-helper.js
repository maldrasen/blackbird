global.ItemHelper = (function() {

  const valuePerformanceAmplitude = 0.15;
  const armorValueReductionMidpoint = 60;
  const armorValueReductionSpread = 45;
  const weaponValueDpsMidpoint = 90
  const weaponValueDpsSpread = 60;

  // This function maps a performance metric (a weapon's damage per second, an armor's total damage reduction) onto a
  // modest multiplier for the item's value, centered on 1.0. A tanh curve keeps the effect bounded to +/- the
  // amplitude and tapers off at the extremes, so an unusually high metric never runs the price away: a 400 DPS
  // weapon is worth only a little more than a 200 DPS one. The metric that sits at the neutral 1.0 factor is the
  // midpoint, and the spread sets how quickly the factor climbs or falls away from it.
  function getArmorValueFactor(metric) {
    return 1 + (valuePerformanceAmplitude * Math.tanh((metric - armorValueReductionMidpoint) / armorValueReductionSpread));
  }

  function getWeaponValueFactor(metric) {
    return 1 + (valuePerformanceAmplitude * Math.tanh((metric - weaponValueDpsMidpoint) / weaponValueDpsSpread));
  }

  // A reduction profile describes how much of each physical damage type an item's shape turns away at steel quality.
  // The primary material's absorption scales that down to what the piece really deflects. The early return keeps
  // materials without an absorption factor legal on items that have no reduction profile.

  // TODO: I'm going to need to look at these values to make sure it makes sense to do it this way. I need to add the
  //       item details panel to the equipment tab in the character overlay in order to look at these values though.

  function getScaledReduction(profile, material, type) {
    const base = (profile || {})[type] || 0;
    if (base === 0) { return 0; }

    const absorption = (material == null) ? 1 : Material.getFactor(material, MaterialFactor.absorption);
    return Math.round(base * absorption);
  }

  return Object.freeze({
    getArmorValueFactor,
    getWeaponValueFactor,
    getScaledReduction,
  });

})();
