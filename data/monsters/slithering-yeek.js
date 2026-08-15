BaseMonster.register('slithering-yeek',{
  name: 'Slithering Yeek',
  description: `A yeek is either a reptilian centipede or a snake with far too many legs. The only thing for certain is 
    that it's coming to get you.`,
  genderRatio: { none:100 },
  type: 'critter',
  level: 3,

  prioritizedAbilities: [
    { code:'venomous-bite', priority:50, poisonStrength:5 },
  ],

});

// TODO: Higher level yeek with a toxic grapple attack.
