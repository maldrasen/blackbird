BaseMonster.register('lesser-daggermaw',{
  name: 'Lesser Daggermaw',
  description: `Daggermaws are large tunneling, worm like creatures. They don't seem to have a front end or a back, as 
    both end in wide circular arrays of teeth.`,
  genderRatio: { none:100 },
  type: 'creature',
  level: 4,

  prioritizedAbilities: [
    { code:'beast-bite', priority:50 },
  ],

});
