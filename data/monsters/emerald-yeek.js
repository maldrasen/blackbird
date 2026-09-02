BaseMonster.register('emerald-yeek',{
  name: 'Emerald Yeek',
  description: `The yeek's bright green body is coated in a thick mucus that glistens in the torchlight. It's toxic, 
    venomous, and poisonous.`,
  bodyPlan: 'yeek',
  type: 'critter',
  level: 5,

  healthFactor: 0.5,

  prioritizedAbilities: {
    venomBite: {
      code: 'venomous-bite',
      priority: 80,
      damage: [10,20],
      speed: 1000,
      poisonStrength: 15,
      poisonDamage: { x:2, d:6, p:2 },
      essence: 100 },

    bite: { code:'beast-bite', priority:50, damage:[10,20], speed:1000, essence:10 },
  },

  lootGroups: { yeeks:100 },

});

// TODO: Add toxic grapple that immobilizes and causes toxic buildup. We'll need to fully implement both the toxic
//       status and grapple attacks.
