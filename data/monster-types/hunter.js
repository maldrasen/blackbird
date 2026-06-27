MonsterType.register('hunter',{

  threatWeights: {
    leastArmor: 75,
    leastHealth: 100,
  },

  prioritizedAbilities: [
    { code:StandardAbility.basicAttack, priority:50 },
  ],

  attributeGrowth: {
    strength: 20,
    dexterity: 100,
    vitality: 30,
    intelligence: 50,
    beauty: 10,
  },

});
