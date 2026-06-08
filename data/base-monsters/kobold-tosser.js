BaseMonster.register('kobold-tosser',{
  name: 'Kobold Tosser',
  species: SpeciesCode.kobold,
  genderRatio: { male:100, futa:20 },
  triggers: [],

  brain: 'hunter',
  level: 5,

  attackTable:[
    { base:'spear', name:'bone spear' },
  ],

});
