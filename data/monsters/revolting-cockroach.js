BaseMonster.register('revolting-cockroach',{
  name: 'Revolting Cockroach',
  description: `If you thought normal cockroaches were gross, how about one that's the side of a small dog?`,
  bodyPlan: 'insect',
  type: 'critter',
  level: 1,

  healthFactor: 1.2,
  speedFactor: 0.9,

  prioritizedAbilities: [
    Ability.Bite({ damage:[10,20], speed:1000 }),
  ],

});
