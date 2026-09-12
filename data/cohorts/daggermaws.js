
const normal = WeaverPackage('cohort.daggermaws.N');
const ambush = WeaverPackage('cohort.daggermaws.PA');
const surprise = WeaverPackage('cohort.daggermaws.MA');

Cohort.register('daggermaws',{
  maximum: 5,
  monsters:[
    'lesser-daggermaw',
  ],
  startText:{
    normal: normal,
    partyAmbushed: ambush,
    monstersAmbushed: surprise,
  },
});

normal.add(`You open the door to the room to find a large daggermaw already charging towards you.`, BattleRequirements.againstSingle());
normal.add(`A group of daggermaws charge at you, their circular mouths gnashing hungrily.`, BattleRequirements.againstMultiple());

ambush.add(`The stone floor at your feet suddenly cracks and a large daggermaw bursts from the ground before you.`, BattleRequirements.againstSingle());
ambush.add(`One of the room's stone walls suddenly crumbles as daggermaws burrow their way though it.`, BattleRequirements.againstMultiple());

surprise.add(`You find a lone daggermaw, coiled in the corner of the room, seemingly asleep.`, BattleRequirements.againstSingle());
surprise.add(`You come across a group of daggermaws, busy either fighting or mating; it's hard to tell which.`, BattleRequirements.againstMultiple());
