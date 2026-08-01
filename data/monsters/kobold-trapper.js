BaseMonster.register('kobold-trapper',{
  name: 'Kobold Trapper',
  species: SpeciesCode.kobold,
  genderRatio: { male:100 },
  type: 'fighter',
  triggers: [],
  level: 3,

  equipment: {
    loadouts:[
      { main:{ base:'spear', material:MaterialType.bone }},
      { main:{ base:'hammer', material:MaterialType.bone, name:'bone club' }, off:{ base:'targe' }},
    ],
    armor:[
      { base:'doublet', material:MaterialType.leather },
    ],
  },

  naturalArmor: { slash:5, pierce:5 },

});
