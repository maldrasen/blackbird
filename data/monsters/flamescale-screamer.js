BaseMonster.register('flamescale-screamer',{
  name: 'Flamescale Screamer',
  species: SpeciesCode.kobold,
  type: 'mage',
  archetypes: { maniac:10 },
  triggers: ['red-hair'],
  level: 8,
  equipmentOptions: { budget:100 },

  skills: {
    sorcery: 5,
  },

  buildAbilities: () => { return [
    Ability.CastSpell({ spell:'overwhelming-effulgence', powerLevel:2, priority:100, cooldown:4000 }),
    Ability.CastSpell({ spell:'searing-lance', powerLevel:3, priority:75, cooldown:2000 }),
    Ability.CastSpell({ spell:'ember', powerLevel:1 }),
  ]},

  lootGroups: {
    nothing: 100,
    kobolds: 40,
    gear: 10,
    extra: 5,
  },
});
