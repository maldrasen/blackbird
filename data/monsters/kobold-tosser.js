BaseMonster.register('kobold-tosser',{
  name: 'Kobold Tosser',
  species: SpeciesCode.kobold,
  genderRatio: { male:100, futa:20 },
  type: 'hunter',
  triggers: [],
  level: 5,

  equipment: {
    loadouts:[
      { main:{ base:'spear', material:MaterialType.bone }},
    ],
  },

  naturalArmor: { slash:5, pierce:5 },

});
