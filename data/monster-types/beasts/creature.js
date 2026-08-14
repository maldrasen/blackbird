// The "Creature" type is a basic beast type that favors strength and vitality.
MonsterType.register('critter',{

  threatWeights: {
    closest: 75,
    leastArmor: 50,
  },

  prioritizedAbilities: [
    { code:'basic-attack', priority:50 },
  ],

  baseAttributes: {
    strength:     [15,25],
    dexterity:    [5,10],
    vitality:     [15,25],
    intelligence: [3,5],
    beauty:       [3,5],
  },

  attributeGrowth: {
    strength:     120,
    dexterity:    80,
    vitality:     120,
    intelligence: 10,
    beauty:       10,
  },

});
