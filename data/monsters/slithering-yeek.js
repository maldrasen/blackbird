BaseMonster.register('slithering-yeek',{
  name: 'Slithering Yeek',
  description: `A yeek is either a reptilian centipede or a snake with far too many legs. The only thing for certain is 
    that it's coming to get you.`,
  bodyPlan: 'yeek',
  type: 'critter',
  level: 2,

  healthFactor: 0.5,

  prioritizedAbilities: [
    Ability.VenomousBite({ damage:[10,20], speed:1000, priority:80, poisonStrength:10, poisonDamage:{ x:1, d:6, p:2 } }),
    Ability.Bite({ damage:[10,20], speed:1000 }),
  ],

  lootGroups: {
    nothing: 100,
    yeeks: 50,
  },

});

// TODO: Higher level yeek with a toxic grapple attack.
