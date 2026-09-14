BaseMonster.register('emerald-yeek',{
  name: 'Emerald Yeek',
  description: `The yeek's bright green body is coated in a thick mucus that glistens in the torchlight. It's toxic, 
    venomous, and poisonous.`,
  bodyPlan: 'yeek',
  type: 'critter',
  level: 6,

  healthFactor: 0.5,

  prioritizedAbilities: [
    Ability.VenomousBite({ damage:[10,20], speed:1000, priority:80, poisonStrength:15, poisonDamage:{ x:2, d:6, p:2 } }),
    Ability.Bite({ damage:[10,20], speed:1000 }),
  ],

  lootGroups: {
    nothing: 100,
    yeeks: 50,
  },
});

// TODO: Add toxic grapple that immobilizes and causes toxic buildup. We'll need to fully implement both the toxic
//       status and grapple attacks.
