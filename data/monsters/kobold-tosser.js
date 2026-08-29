BaseMonster.register('kobold-tosser',{
  name: 'Kobold Tosser',
  species: SpeciesCode.kobold,
  genderRatio: { male:100, female:20, futa:10 },
  type: 'hunter',
  triggers: [],
  level: 5,

  prioritizedAbilities:[
    { code:'monster-use-article', priority:100, article:'blasto', cooldown:5000 },
  ],

  equipment: {
    loadouts:[
      { main:{ base:'bone-spear' }},
    ],
  },

});
