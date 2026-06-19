MonsterBrain.register('fighter',{

  threatWeights: {
    closest: 50,
    leastArmor: 75,
    leastHealth: 100,
  },

  prioritizedAbilities: [
    'basic-attack',
  ],

  attributeGrowth: {
    strength: 100,
    dexterity: 60,
    vitality: 80,
    intelligence: 20,
    beauty: 10,
  },

});
