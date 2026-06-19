MonsterBrain.register('coward',{

  // Cowards pick their targets based on whoever is close to them and who looks like an easy kill.
  threatWeights: {
    closest: 50,
    leastArmor: 75,
    leastHealth: 75,
  },

  prioritizedAbilities: [
    'basic-attack',
  ],

  attributeGrowth: {
    strength: 30,
    dexterity: 80,
    vitality: 100,
    intelligence: 10,
    beauty: 10,
  },

});
