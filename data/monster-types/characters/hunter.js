MonsterType.register('hunter',{
  preferredPosition: 'back',

  threatWeights: {
    leastArmor: 60,
    leastHealth: 80,
    furtherBack: 100,
  },

  prioritizedAbilities: {
    attack: { code:'basic-attack', priority:50 },
  },

  attributeGrowth: {
    strength: 20,
    dexterity: 100,
    vitality: 30,
    intelligence: 50,
    beauty: 10,
  },

});
