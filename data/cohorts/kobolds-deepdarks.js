
const normal = WeaverPackage('cohort.deepdarks.N');
const ambush = WeaverPackage('cohort.deepdarks.PA');
const surprise = WeaverPackage('cohort.deepdarks.MA');

Cohort.register('kobolds-deepdarks',{
  minimum: 3,
  monsters:[
    'deepdark-kobold',
    'deepdark-whisperer',
    'kobold-dick-puncher',
    'kobold-runt',
    'kobold-tosser',
    'kobold-trapper',
  ],
  startText:{
    normal: normal,
    partyAmbushed: ambush,
    monstersAmbushed: surprise,
  },
  factoryOptions:{
    triggers: ['black-hair'],
  },
});

normal.add(`You're suddenly attacked by a small group of black scaled kobolds!`,BattleRequirements.againstAtMost(5));
normal.add(`You're suddenly attacked by a large group of black scaled kobolds!`,BattleRequirements.againstAtLeast(6));

ambush.add(`You walk into a seemingly empty room, when suddenly black scaled kobolds leap from the shadows!`);

surprise.add(`You come across a group of sleeping kobolds. The lone kobold on watch doesn't notice you, giving you the opportunity to make the first attack.`);
