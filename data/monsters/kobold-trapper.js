BaseMonster.register('kobold-trapper',{
  name: 'Kobold Trapper',
  species: SpeciesCode.kobold,
  genderRatio: { male:100 },
  type: 'fighter',
  triggers: [],
  level: 3,

  attackTable:[
    { base:'spear', name:'bone spear' },
  ],

});
