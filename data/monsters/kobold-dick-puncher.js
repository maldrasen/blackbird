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

  // The abilities should be a list of factory functions like this, avoiding any load order problems (even though
  // Abilities will load before BaseMonsters, better to not rely on the alphabetical accident of them loading first)
  // Also maybe just call this abilities now?
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

function buildPunch() {
  return Ability.NaturalAttack({
    ...NaturalAttack.Punch, // Standard punch attack options. Maybe...
    damage: [20,30],
    speed: 500,
    priority: 50,
  });
}

// I think I would prefer something like:
//    Ability.NaturalAttack('punch',{ ... });
// or
//    Ability.Punch({ ... })
