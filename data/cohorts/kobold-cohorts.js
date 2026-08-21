
const deepdarkNormal = WeaverPackage('cohort.deepdark-kobolds.normal');
deepdarkNormal.add(`You're suddenly attacked by a small group of black scaled kobolds!`,BattleRequirements.againstAtMost(5));
deepdarkNormal.add(`You're suddenly attacked by a large group of black scaled kobolds!`,BattleRequirements.againstAtLeast(6));

const deepdarkAmbush = WeaverPackage('cohort.deepdark-kobolds.party-ambushed');
deepdarkAmbush.add(`You walk into a seemingly empty room, when suddenly black scaled kobolds leap from the shadows!`);

const deepdarkSurprised = WeaverPackage('cohort.deepdark-kobolds.monsters-ambushed');
deepdarkSurprised.add(`You come across a group of sleeping kobolds. The lone kobold on watch doesn't notice you, giving you the opportunity to make the first attack.`);

Cohort.register('deepdark-kobolds',{
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
    normal: deepdarkNormal,
    partyAmbushed: deepdarkAmbush,
    monstersAmbushed: deepdarkSurprised,
  },
  factoryOptions:{
    triggers: ['black-hair'],
  },
});

// =============================================================================

const flamescaleNormal = WeaverPackage('cohort.flamescale-kobolds.normal');
flamescaleNormal.add(`You're suddenly attacked by a small group of red scaled kobolds!`,BattleRequirements.againstAtMost(5));
flamescaleNormal.add(`You're suddenly attacked by a large group of red scaled kobolds!`,BattleRequirements.againstAtLeast(6));

const flamescaleAmbush = WeaverPackage('cohort.flamescale-kobolds.party-ambushed');
flamescaleAmbush.add(`You walk into a seemingly empty room, when suddenly red scaled kobolds leap from the shadows!`);

const flamescaleSurprised = WeaverPackage('cohort.flamescale-kobolds.monsters-ambushed');
flamescaleSurprised.add(`You come across a group of sleeping kobolds. The lone kobold on watch doesn't notice you, giving you the opportunity to make the first attack.`);

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
    normal: flamescaleNormal,
    partyAmbushed: flamescaleAmbush,
    monstersAmbushed: flamescaleSurprised,
  },
  factoryOptions:{
    triggers: ['red-hair'],
  },
});
