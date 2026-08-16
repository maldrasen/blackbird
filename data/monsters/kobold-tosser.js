BaseMonster.register('kobold-tosser',{
  name: 'Kobold Tosser',
  species: SpeciesCode.kobold,
  genderRatio: { male:100, female:20, futa:10 },
  type: 'hunter',
  triggers: [],
  level: 5,

  equipment: {
    loadouts:[
      { main:{ base:'bone-spear' }},
    ],
  },

});
