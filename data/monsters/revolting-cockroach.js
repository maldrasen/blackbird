BaseMonster.register('revolting-cockroach',{
  name: 'Revolting Cockroach',
  description: `If you thought normal cockroaches were gross, how about one that's the side of a small dog?`,
  bodyPlan: 'insect',
  type: 'critter',
  level: 2,

  healthFactor: 1.2,
  speedFactor: 0.9,

  prioritizedAbilities: {
    bite: { code:'beast-bite', priority:50, damage:[10,20], speed:1000, essence:10 },
  },

});
