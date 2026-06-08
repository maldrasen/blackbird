BaseMonster.register('kobold-sneak-slut',{
  name: 'Kobold Sneak Slut',
  species: SpeciesCode.kobold,
  genderRatio: { male:5, female:60, futa:20, enby:5 },
  triggers: [],

  brain: 'rogue',
  level: 3,

  // Adds a preference for attacking women on top of rogue weights.
  threatWeights: {
    closest: 10,
    leastArmor: 80,
    leastHealth: 40,
    killWomen: 100,
  },

  attackTable:[
    { base:'knife', name:'bone knife' },
  ],

});
