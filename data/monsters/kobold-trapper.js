BaseMonster.register('kobold-trapper',{
  name: 'Kobold Trapper',
  species: SpeciesCode.kobold,
  genderRatio: { male:100, female:20, futa:10 },
  type: 'fighter',
  triggers: [],
  level: 3,

  equipment: {
    loadouts:[
      { main:{ base:'bone-spear' }},
      { main:{ base:'bone-club' }, off:{ base:'targe' }},
    ],
    armor:[
      { base:'leather-doublet' },
    ],
  },

  lootGroups: {
    nothing: 100,
    kobolds: 30,
    extra: 5,
  },
});
