const greetingPackage = WeaverPackage('kobold-dick-puncher-greeting');

BaseMonster.register('kobold-dick-puncher',{
  name: 'Kobold Dick Puncher',
  species: SpeciesCode.kobold,
  genderRatio: { male:100 },
  type: 'fighter',
  triggers:[],
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
    { main:{ base:'fist' }, off:{ base:'fist' }}
  ],

  prioritizedAbilities:[
    { code:'dick-punch', priority:100 },
  ],

  negotiationGreeting: greetingPackage,
});

greetingPackage.add(`The kobold cracks his knuckles and smiles. With surprising boldness he steps closer to you,
  putting the small lizard man right at eye level with your crotch. "Don't think I'll back down just cause you killed
  off the others. Didn't like them anyway, and I got plenty of fight left in me."`);
