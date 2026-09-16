MonsterType.register('mage',{
  preferredPosition: 'back',

  threatWeights: {
    leastHealth: 100,
  },

  buildAbilities: () => { return [
    Ability.WeaponAttack(),
  ]},

  attributeGrowth: {
    strength: 10,
    dexterity: 10,
    vitality: 30,
    intelligence: 100,
    beauty: 30,
  },

});
