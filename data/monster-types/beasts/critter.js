MonsterType.register('critter',{

  threatWeights: {
    closest: 75,
    leastArmor: 50,
  },

  prioritizedAbilities: [
    { code:'basic-attack', priority:50 },
  ],

  baseAttributes: {
    strength:     [5,10],
    dexterity:    [15,25],
    vitality:     [5,10],
    intelligence: [3,5],
    beauty:       [3,5],
  },

  attributeGrowth: {
    strength:     100,
    dexterity:    120,
    vitality:     80,
    intelligence: 10,
    beauty:       10,
  },

});
