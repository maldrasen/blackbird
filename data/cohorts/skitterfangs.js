
const normal = WeaverPackage('cohort.skitterfangs.N');
normal.add(`A pack of rabid little beasts, made of teeth and anger, bursts out of the shadows to attack you. `, BattleRequirements.againstAtMost(5));
normal.add(`A large horde of skitterfangs leap from the shadows.`, BattleRequirements.againstAtLeast(6));

const ambush = WeaverPackage('cohort.skitterfangs.PA');
ambush.add(`You walk into the room, unaware that a pack of skitterfangs were lurking in an alcove above the doorway.`);

const surprise = WeaverPackage('cohort.skitterfangs.MA');
surprise.add(`You some across a group of skitterfangs quickly devouring a corpse in the center of the room. They're too distracted by their feast to notice you.`);

Cohort.register('skitterfangs',{
  minimum: 3,
  monsters:[
    'rabid-skitterfang',
  ],
  startText:{
    normal: normal,
    partyAmbushed: ambush,
    monstersAmbushed: surprise,
  },
});
