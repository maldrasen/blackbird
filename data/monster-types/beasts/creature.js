// The "Creature" type is a basic beast type that favors strength and vitality.
MonsterType.register('creature',{

  threatWeights: {
    closest: 75,
    leastArmor: 50,
  },

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

  baseSkills: {
    dodge:     [10,20],
    maces:     [10,20],
    grappling: [5,10],
    daggers:   [0,5],
  },

  skillGrowth: {
    dodge: 40,
    maces: 40,
    grappling: 20,
    daggers: 10,
  },

});
