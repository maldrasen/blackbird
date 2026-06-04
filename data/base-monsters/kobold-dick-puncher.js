BaseMonster.register('kobold-dick-puncher',{
  name: 'Kobold Dick Puncher',
  species: SpeciesCode.kobold,
  genderRatio: { male:100 },
  triggers:[],

  brain: 'fighter',
  level: 5,

  // Adds a preference for attacking men on top of fighter weights.
  threatWeights: {
    closest: 20,
    leastArmor: 40,
    leastHealth: 80,
    killMen: 100,
  },


  // We don't really have a 'punching' basic attack, but we can fake it with a hammer.
  attackTable:[
    { base:'hammer', name:'fists', attackText:'dick-punch' },
  ],

});
