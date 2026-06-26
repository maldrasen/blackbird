MonsterBrain.register('mage',{

  threatWeights: {
    leastHealth: 100,
  },

  prioritizedAbilities: [
    { code:StandardAbility.basicDefend, priority:20 },
  ],

  attributeGrowth: {
    strength: 10,
    dexterity: 10,
    vitality: 30,
    intelligence: 100,
    beauty: 30,
  },

});
