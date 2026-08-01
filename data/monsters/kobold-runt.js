const greetingPackage = WeaverPackage('kobold-runt-greeting');

BaseMonster.register('kobold-runt',{
  name: 'Kobold Runt',
  species: SpeciesCode.kobold,
  genderRatio: { female:100 },
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

  abilities:[
    // bite attack.
  ],

  negotiationGreeting: greetingPackage,
});

greetingPackage.add(`The kobold looks shocked as you lower your weapon. {T:He} looks around, thinking you must be
  talking to someone else, but seeing that {T:he's} the only one left standing, {T:he} nervously turns to face you.
  "Huh, what… you want to talk? Uhh… okay."`);
