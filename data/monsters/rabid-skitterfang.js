BaseMonster.register('rabid-skitterfang',{
  name: 'Rabid Skitterfang',
  description: `A very bitey creature, a skitterfang is essentially a mouth that hops about on two legs.`,
  genderRatio: { none:100 },
  type: 'critter',
  level: 1,

  healthFactor: 0.25,
  speedFactor: 0.75,

  prioritizedAbilities: [
    { code:'beast-bite', priority:50 },
  ],

});
