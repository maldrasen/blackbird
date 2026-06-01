BaseMonster.register('kobold-runt',{
  name: 'Kobold Runt',
  species: SpeciesCode.kobold,
  brain: 'coward',

  // What if we want to select from a table of available weapons that a kobold could be equipped with? Just to add a
  // bit more variety to the monsters. The selected weapon attack should be added to the monster entity that we build
  // when we start the battle. Sometimes there are no options though, and sometimes there are no weapon attacks. The
  // attacks array needs to be able to hold 'natural' attacks as well. These aren't really OO classes though. They're
  // just functions that return objects, so the attacks could look identical to the monster brain and battle
  // calculator.

  attackTable:[
    // { base:'hammer', name:'bone club', mode:'swing' },
    // { base:'spear', name:'bone spear', mode:'thrust' },
  ],

  abilities:[
    // bite attack.
  ],

  // Armor is a little complex as well. We should be able to define an object with all the monster's slots and
  // set the damage reduction individually for each slot, but most of the time we'll want a canned armor set, and
  // canned armor pieces. Something like a kobold may have a leather chest, and nothing else. We don't want to make an
  // item entity for each one if there's no inventory yet.

});



// global.WeaponAttack = function(options) {
//
//   Validate.exists('WeaponAttack.base',options.base);
//   Validate.isIn('WeaponAttack.mode',options.mode,['swing','thrust']);
//
//   const base = BaseWeapon.lookup(options.base);
//   const mode = options.mode;
//   const name = options.name || base.getName()
//
//   console.log(`Built Weapon Attack [${options.base}] ${name} ${mode}`)
//
//   return Object.freeze({
//
//   });
// }

// Weapon attacks can have standard attack texts based on the attack mode, 'swing', 'thrust', etc.
// We can also send an array of custom attack text as well if needed.

// text:[
//   `The {A:name} attacks {T:name} with a {A:weapon-name}.`,
//   `The {A:name} swings {A:his} {A:weapon-name} at {T:name}.`
// ]}

// Actually...
// This is saved on the monster component so it can't be a complex object like this...
