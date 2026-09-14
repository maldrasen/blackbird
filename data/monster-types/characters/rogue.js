MonsterType.register('rogue',{
  preferredPosition: 'back',

  threatWeights: {
    closest: 25,
    leastArmor: 100,
    leastHealth: 75,
  },

  // TODO: These abilities all need to implement the priority option.
  buildAbilities: () => { return [
    Ability.Hide({ priority:50 }),
    Ability.SneakAttack({ priority:30 }),
    Ability.WeaponAttack({ priority:10 }),
  ]},

  attributeGrowth: {
    strength: 50,
    dexterity: 100,
    vitality: 30,
    intelligence: 10,
    beauty: 10,
  },

});
