// Abominations have somewhat lower stats than other beasts, but abominations should usually have more special
// abilities and such.
MonsterType.register('abomination',{
  preferredPosition: 'front',

  threatWeights: {
    closest: 75,
    leastHealth: 50,
  },

  attributes: {
    strength:     'C',
    dexterity:    'D',
    vitality:     'B',
    intelligence: 'F',
    beauty:       'D',
  },

  attributeGrowth: {
    strength:     100,
    dexterity:    80,
    vitality:     120,
    intelligence: 10,
    beauty:       80,
  },

  baseSkills: {
    dodge:     [10,20],
    maces:     [5,10],
    grappling: [10,20],
    daggers:   [5,10],
  },

  skillGrowth: {
    dodge: 40,
    maces: 20,
    grappling: 40,
    daggers: 20,
  },

});
