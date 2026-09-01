MonsterType.register('fighter',{
  preferredPosition: 'front',

  threatWeights: {
    closest: 50,
    leastArmor: 75,
    leastHealth: 100,
  },

  prioritizedAbilities: {
    attack: { code:'basic-attack', priority:50 },
  },

  attributeGrowth: {
    strength: 100,
    dexterity: 60,
    vitality: 80,
    intelligence: 20,
    beauty: 10,
  },

});
