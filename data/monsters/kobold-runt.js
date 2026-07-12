const greetingPackage = WeaverPackage('kobold-runt-greeting');

BaseMonster.register('kobold-runt',{
  name: 'Kobold Runt',
  species: SpeciesCode.kobold,
  genderRatio: { female:100 },
  type: 'coward',
  triggers:[],
  level: 1,

  attackTable:[
    { base:'hammer', name:'bone club' },
    { base:'spear', name:'bone spear' },
  ],

  abilities:[
    // bite attack.
  ],

  // Armor is a little complex as well. We should be able to define an object with all the monster's slots and
  // set the damage reduction individually for each slot, but most of the time we'll want a canned armor set, and
  // canned armor pieces. Something like a kobold may have a leather chest, and nothing else. We don't want to make an
  // item entity for each one if there's no inventory yet.

  negotiationGreeting: greetingPackage,
});

greetingPackage.add(`The kobold looks shocked as you lower your weapon. {T:He} looks around, thinking you must be
  talking to someone else, but seeing that {T:he's} the only one left standing, {T:he} nervously turns to face you.
  "Huh, what… you want talk? Uhh… okay."`);
