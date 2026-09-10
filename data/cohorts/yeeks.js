
const normal = WeaverPackage('cohort.yeeks.N');
normal.add(`A single yeek looks up as you enter the room. It opens it's fanged mouth, letting out an ear splitting, "YEEEK!" before charging you. `, BattleRequirements.againstSingle());
normal.add(`As you enter the room you spot a group of yeeks, their reptilian bodies clinging to of the walls.`, BattleRequirements.againstMultiple());

const ambush = WeaverPackage('cohort.yeeks.PA');
ambush.add(`A yeek, clinging to the ceiling, suddenly drops on you as you enter the room.`, BattleRequirements.againstSingle());
ambush.add(`You pull the door open, shocked to see that back of the wooden door is covered in clinging yeeks.`, BattleRequirements.againstMultiple());

const surprise = WeaverPackage('cohort.yeeks.MA');
surprise.add(`A yeek lies curled up on the floor, moving sluggishly as it wakes.`, BattleRequirements.againstSingle());
surprise.add(`You come across a group of sleeping yeeks. They begin to stir, but for a moment, you have the upper hand.`, BattleRequirements.againstMultiple());

Cohort.register('yeeks',{
  monsters:[
    'emerald-yeek',
    'slithering-yeek',
  ],
  startText:{
    normal: normal,
    partyAmbushed: ambush,
    monstersAmbushed: surprise,
  },
});
