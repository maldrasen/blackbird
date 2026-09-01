MonsterType.register('rogue',{
  preferredPosition: 'back',

  threatWeights: {
    closest: 25,
    leastArmor: 100,
    leastHealth: 75,
  },

  prioritizedAbilities: {
    hide: { code:'hide', priority:50 },
    sneakAttack: { code:'sneak-attack', priority:30 },
    attack: { code:'basic-attack', priority:10 },
  },

  attributeGrowth: {
    strength: 50,
    dexterity: 100,
    vitality: 30,
    intelligence: 10,
    beauty: 10,
  },

});
