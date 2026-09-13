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

  // Maybe just call this abilities now?
  prioritizedAbilities:[
    buildDickPunch,
    buildPunch,
  ],

  negotiationGreeting: greetingPackage,

  lootGroups: {
    nothing: 100,
    kobolds: 30,
    extra: 5,
  },
});

greetingPackage.add(`The kobold cracks his knuckles and smiles. With surprising boldness he steps closer to you,
  putting the small lizard man right at eye level with your crotch. "Don't think I'll back down just cause you killed
  off the others. Didn't like them anyway, and I got plenty of fight left in me."`);

function buildDickPunch() {
  return Ability.DickPunch({  // Factory in data/abilities that uses NaturalAttack to build an Ability.
    priority: 100,            // If the monster abilities becomes an array, each ability will need to have a priority property, set here through the factory options.
  });
}

// NaturalAttack gets an optional parameter, taking a code for a natural ability option map that we can spread into
// the passed options.

function buildPunch() {
  return Ability.NaturalAttack({
    damage: [20,30],
    speed: 500,
    priority: 50,
  },'punch');
}
