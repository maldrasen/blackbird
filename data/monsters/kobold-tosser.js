BaseMonster.register('kobold-tosser',{
  name: 'Kobold Tosser',
  species: SpeciesCode.kobold,
  genderRatio: { male:100, futa:20 },
  type: 'hunter',
  archetypes: { savage:50, brat:40, playful:30 },
  triggers: [],
  level: 5,

  attackTable:[
    { base:'spear', name:'bone spear' },
  ],

});
