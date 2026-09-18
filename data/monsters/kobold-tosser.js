BaseMonster.register('kobold-tosser',{
  name: 'Kobold Tosser',
  species: SpeciesCode.kobold,
  genderRatio: { male:100, female:20, futa:10 },
  type: 'hunter',
  triggers: [],
  level: 5,

  buildAbilities: () => { return [
    Ability.UseArticle({ article:'blasto', priority:100, cooldown:5000 }),
  ]},

  lootGroups: {
    nothing: 100,
    kobolds: 30,
  },

  lootAdjustments: [
    { addArticle:'blasto', group:'kobolds', rarity:Rarity.common },
  ],

});
