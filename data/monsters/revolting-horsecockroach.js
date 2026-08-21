BaseMonster.register('revolting-horsecockroach',{
  name: 'Revolting Horsecockroach',
  description: `Much larger and… girthier than your average cockroach.`,
  bodyPlan: 'insect',
  type: 'critter',
  level: 4,

  healthFactor: 1.3,
  speedFactor: 0.8,

  prioritizedAbilities: [
    { code:'beast-bite', priority:50, damage:[20,30], speed:1200, essence:20 },
  ],

});
