// The "Creature" type is a basic beast type that favors strength and vitality.
MonsterType.register('creature',{
  preferredPosition: 'front',

  threatWeights: {
    closest: 75,
    leastArmor: 50,
  },

  attributes: {
    strength:     'A',
    dexterity:    'C',
    vitality:     'A',
    intelligence: 'F',
    beauty:       'F',
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
