global.AbilityAppraiser = (function() {

  // TODO: Loop through all the base monsters and their abilities, and appraise every ability that doesn't have an
  //       essence already set.
  function run() {}

  function appraise(ability) {
    ability.setEssence(0);
  }

// A record that calculates its essence returns the terms behind it for the ability essence report. A hand-set
// value has no terms, only a total.
// function getEssenceBreakdown(entry) {
//   return typeof ability.getEssenceBreakdown === 'function' ?
//     ability.getEssenceBreakdown(entry) :
//     { total:(ability.essence || 0), handSet:true };
// }

  return { run };

})();
