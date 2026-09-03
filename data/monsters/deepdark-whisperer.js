BaseMonster.register('deepdark-whisperer',{
  name: 'Deepdark Whisperer',
  species: SpeciesCode.kobold,
  type: 'rogue',
  triggers: ['black-hair'],
  level: 8,

  lootGroups: {
    nothing: 100,
    kobolds: 30,
    extra: 5,
  },
});
