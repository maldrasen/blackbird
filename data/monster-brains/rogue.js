MonsterBrain.register('rogue',{

  threatWeights: {
    closest: 25,
    leastArmor: 100,
    leastHealth: 75,
  },

  prioritizedAbilities: [
    'hide',
    'sneak-attack',
    'basic-attack',
  ],

  attributeGrowth: {
    strength: 50,
    dexterity: 100,
    vitality: 30,
    intelligence: 10,
    beauty: 10,
  },

});
