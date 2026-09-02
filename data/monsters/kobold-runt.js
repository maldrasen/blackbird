const greetingPackage = WeaverPackage('kobold-runt-greeting');

BaseMonster.register('kobold-runt',{
  name: 'Kobold Runt',
  species: SpeciesCode.kobold,
  genderRatio: { female:100, futa:20, male:10, enby:10 },
  type: 'coward',
  archetypes: { timid:10 },
  triggers:[],
  level: 1,

  equipment: {
    loadouts:[
      { main:{ base:'bone-club' }},
      { main:{ base:'bone-spear' }},
    ],
  },

  prioritizedAbilities:{
    bite: { code:'beast-bite', priority:10, damage:[10,30], speed:1000, essence:10 },
  },

  lootGroups:['kobolds'],

  negotiationGreeting: greetingPackage,
});

greetingPackage.add(`The kobold looks shocked as you lower your weapon. {T:He} looks around, thinking you must be
  talking to someone else, but seeing that {T:he's} the only one left standing, {T:he} nervously turns to face you.
  "Huh, what... you want to talk? Uhh... okay."`);
