global.AbilityAppraiser = function(ability) {

// A record that calculates its essence returns the terms behind it for the ability essence report. A hand-set
// value has no terms, only a total.
// function getEssenceBreakdown(entry) {
//   return typeof ability.getEssenceBreakdown === 'function' ?
//     ability.getEssenceBreakdown(entry) :
//     { total:(ability.essence || 0), handSet:true };
// }

  function appraise() {
    ability.setEssence(0);
  }

  return { appraise };

}

