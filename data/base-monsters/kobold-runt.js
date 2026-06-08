BaseMonster.register('kobold-runt',{
  name: 'Kobold Runt',
  species: SpeciesCode.kobold,
  genderRatio: { female:100 },
  triggers:[],

  brain: 'coward',
  level: 1,

  attackTable:[
    { base:'hammer', name:'bone club' },
    { base:'spear', name:'bone spear' },
  ],

  abilities:[
    // bite attack.
  ],

  // Armor is a little complex as well. We should be able to define an object with all the monster's slots and
  // set the damage reduction individually for each slot, but most of the time we'll want a canned armor set, and
  // canned armor pieces. Something like a kobold may have a leather chest, and nothing else. We don't want to make an
  // item entity for each one if there's no inventory yet.

});

