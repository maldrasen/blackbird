
const normal = WeaverPackage('cohort.flamescales.N');
const ambush = WeaverPackage('cohort.flamescales.PA');
const surprise = WeaverPackage('cohort.flamescales.MA');

Cohort.register('kobolds-flamescales',{
  minimum: 3,
  monsters:[
    'flamescale-kobold',
    'flamescale-screamer',
    'kobold-runt',
    'kobold-sneak-slut',
    'kobold-tosser',
    'kobold-trapper',
  ],
  startText:{
    normal: normal,
    partyAmbushed: ambush,
    monstersAmbushed: surprise,
  },
  factoryOptions:{
    triggers: ['red-hair'],
  },
});

normal.add(`You're suddenly attacked by a small group of red scaled kobolds!`,BattleRequirements.againstAtMost(5));
normal.add(`You're suddenly attacked by a large group of red scaled kobolds!`,BattleRequirements.againstAtLeast(6));

ambush.add(`You walk into a seemingly empty room, when suddenly red scaled kobolds leap from the shadows!`);

surprise.add(`You come across a group of sleeping kobolds. The lone kobold on watch doesn't notice you, giving you the opportunity to make the first attack.`);
