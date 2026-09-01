BaseMonster.register('lesser-daggermaw',{
  name: 'Lesser Daggermaw',
  description: `Daggermaws are large tunneling, worm like creatures. They don't seem to have a front end or a back, as 
    both end in wide circular arrays of teeth.`,
  bodyPlan: 'worm',
  type: 'creature',
  level: 4,

  healthFactor: 1.5,

  prioritizedAbilities: {
    bite: { code:'beast-bite', priority:50, damage:[25,50], speed:1500, essence:50 },
  },

});
