BaseMonster.register('flamescale-screamer',{
  name: 'Flamescale Screamer',
  species: SpeciesCode.kobold,
  type: 'mage',
  archetypes: { maniac:10 },
  triggers: ['red-hair'],
  level: 8,

  skills: {
    sorcery: 5,
  },

  prioritizedAbilities:{
    A: { code:'monster-cast-spell', priority:100, spell:'overwhelming-effulgence', powerLevel:2, cooldown:4000 },
    B: { code:'monster-cast-spell', priority:75, spell:'searing-lance', powerLevel:3, cooldown:2000 },
    C: { code:'monster-cast-spell', priority:50, spell:'ember', powerLevel:1 },
  },

  lootGroups: { kobolds:100 },

});
