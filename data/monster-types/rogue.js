MonsterType.register('rogue',{

  threatWeights: {
    closest: 25,
    leastArmor: 100,
    leastHealth: 75,
  },

  prioritizedAbilities: [
    { code:'hide', priority:50 },
    { code:'sneak-attack', priority:30 },
    { code:'basic-attack', priority:10 },
  ],

  attributeGrowth: {
    strength: 50,
    dexterity: 100,
    vitality: 30,
    intelligence: 10,
    beauty: 10,
  },

});
