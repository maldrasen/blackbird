BaseMonster.register('kobold-trapper',{
  name: 'Kobold Trapper',
  species: SpeciesCode.kobold,
  genderRatio: { male:100 },
  type: 'fighter',
  archetypes: { serious:60, reserved:40, bastard:30 },
  triggers: [],
  level: 3,

  attackTable:[
    { base:'spear', name:'bone spear' },
  ],

});
