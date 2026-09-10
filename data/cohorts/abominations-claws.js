
const normal = WeaverPackage('cohort.claws.N');
normal.add(`Several clawed hands emerge from the darkness, dragging themselves towards you on their long sharp fingers.`);

const ambush = WeaverPackage('cohort.claws.PA');
ambush.add(`You feel a clawed hand suddenly land on your shoulder. You whip around to find the source, flinging the disembodied claw off of you as more of them start dropping from the ceiling.`);

const surprise = WeaverPackage('cohort.claws.MA');
surprise.add(`You come across a group of disembodied claws, engaged in what can only be described as... hand holding.`);

Cohort.register('claws',{
  minimum: 3,
  monsters:[
    'crawling-claw',
  ],
  startText:{
    normal: normal,
    partyAmbushed: ambush,
    monstersAmbushed: surprise,
  },
});
