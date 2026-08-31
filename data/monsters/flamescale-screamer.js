BaseMonster.register('flamescale-screamer',{
  name: 'Flamescale Screamer',
  species: SpeciesCode.kobold,
  type: 'mage',
  archetypes: { maniac:10 },
  triggers: ['red-hair'],
  level: 8,

  prioritizedAbilities:[
    { code:'monster-cast-spell', priority:80, spell:'overwhelming-effulgence', powerLevel:2, cooldown:2000 },
  ],

});
