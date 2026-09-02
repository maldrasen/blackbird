const greetingPackage = WeaverPackage('kobold-dick-puncher-greeting');

BaseMonster.register('kobold-dick-puncher',{
  name: 'Kobold Dick Puncher',
  species: SpeciesCode.kobold,
  genderRatio: { male:100 },
  type: 'fighter',
  archetypes: { bastard:10 },
  triggers:[],
  level: 5,

  // Adds a preference for attacking men on top of fighter weights.
  threatWeights: {
    closest: 20,
    leastArmor: 40,
    leastHealth: 80,
    killMen: 100,
  },

  prioritizedAbilities:{
    dickPunch: { code:'dick-punch', priority:100 },
    punch: { code:'punch', priority:50, damage:[20,30], speed:500, essence:50 },
  },

  lootGroups:['kobolds'],

  negotiationGreeting: greetingPackage,
});

greetingPackage.add(`The kobold cracks his knuckles and smiles. With surprising boldness he steps closer to you,
  putting the small lizard man right at eye level with your crotch. "Don't think I'll back down just cause you killed
  off the others. Didn't like them anyway, and I got plenty of fight left in me."`);
