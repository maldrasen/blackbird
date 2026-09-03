BaseMonster.register('flamescale-kobold',{
  name: 'Flamescale Kobold',
  species: SpeciesCode.kobold,
  type: 'fighter',
  archetypes: { savage:10 },
  triggers: ['red-hair'],
  level: 6,

  lootGroups: {
    nothing: 100,
    kobolds: 40,
    extra: 5,
  },
});
