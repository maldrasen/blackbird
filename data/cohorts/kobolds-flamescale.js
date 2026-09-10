
const normal = WeaverPackage('cohort.flamescales.N');
normal.add(`You're suddenly attacked by a small group of red scaled kobolds!`,BattleRequirements.againstAtMost(5));
normal.add(`You're suddenly attacked by a large group of red scaled kobolds!`,BattleRequirements.againstAtLeast(6));

const ambush = WeaverPackage('cohort.flamescales.PA');
ambush.add(`You walk into a seemingly empty room, when suddenly red scaled kobolds leap from the shadows!`);

const surprise = WeaverPackage('cohort.flamescales.MA');
surprise.add(`You come across a group of sleeping kobolds. The lone kobold on watch doesn't notice you, giving you the opportunity to make the first attack.`);

Cohort.register('flamescale-kobolds',{
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
