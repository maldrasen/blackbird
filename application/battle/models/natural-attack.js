
// A natural attack - a punch, a bite, a claw - stands in for a base weapon in a physical attack contest. It provides
// the same interface the attack and damage rolls read from a real weapon's base record, built from the profile an
// attack ability defines rather than a registered weapon. A profile looks like:
//
//     { skill:'martial-arts', textKey:'punch', damageType:DamageType.crush,
//       low:25, high:50, speed:500, reach:WeaponReach.short }
//
global.NaturalAttack = function(profile) {

  function getDamageTypes() {
    return profile.damageTypes ? profile.damageTypes : [{ type:profile.damageType, percent:100 }];
  }

  return {
    getSkill: () => { return profile.skill; },
    getTextKey: () => { return profile.textKey; },
    getReach: () => { return profile.reach || WeaponReach.short; },
    getLow: () => { return profile.low; },
    getHigh: () => { return profile.high; },
    getSpeed: () => { return profile.speed; },
    getDamageTypes,
  };
}
