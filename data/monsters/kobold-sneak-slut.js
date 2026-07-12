const greetingPackage = WeaverPackage('kobold-sneak-slut-greeting');

BaseMonster.register('kobold-sneak-slut',{
  name: 'Kobold Sneak Slut',
  species: SpeciesCode.kobold,
  genderRatio: { male:5, female:60, futa:20, enby:5 },
  type: 'rogue',
  triggers: [],
  level: 3,

  skills: {
    stealth: 10,
  },

  // Adds a preference for attacking women on top of rogue weights.
  threatWeights: {
    closest: 10,
    leastArmor: 80,
    leastHealth: 40,
    killWomen: 100,
  },

  attackTable:[
    { main:{ base:'knife', name:'bone knife' }, off:{ base:'knife', name:'bone knife' }},
  ],

  negotiationGreeting: greetingPackage,
});

greetingPackage.add(`The kobold snarls, looking about frantically as {T:he} realizes that you've got {T:him} cornered.
  {T:His} expression suddenly changes, giving you a sultry smile. "You're strong. I like the strong ones."`);
