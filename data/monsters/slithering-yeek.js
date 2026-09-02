BaseMonster.register('slithering-yeek',{
  name: 'Slithering Yeek',
  description: `A yeek is either a reptilian centipede or a snake with far too many legs. The only thing for certain is 
    that it's coming to get you.`,
  bodyPlan: 'yeek',
  type: 'critter',
  level: 3,

  healthFactor: 0.5,

  prioritizedAbilities: {
    venomBite: {
      code: 'venomous-bite',
      priority: 80,
      damage: [10,20],
      speed: 1000,
      poisonStrength: 10,
      poisonDamage: { x:1, d:6, p:2 },
      essence: 75 },

    bite: { code:'beast-bite', priority:50, damage:[10,20], speed:1000, essence:10 },
  },

  lootGroups: { yeeks:100 },

});

// TODO: Higher level yeek with a toxic grapple attack.

