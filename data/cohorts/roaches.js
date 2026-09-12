
const normal = WeaverPackage('cohort.roaches.N');
const ambush = WeaverPackage('cohort.roaches.PA');
const surprise = WeaverPackage('cohort.roaches.MA');

Cohort.register('roaches',{
  minimum: 3,
  monsters:[
    'revolting-cockroach',
    'revolting-horsecockroach',
  ],
  startText:{
    normal: normal,
    partyAmbushed: ambush,
    monstersAmbushed: surprise,
  },
});

normal.add(`As you enter the room, cockroaches begin to squeeze out from cracks in the wall.`, BattleRequirements.againstAtMost(3));
normal.add(`A large group of cockroaches erupt from the shadows.`, BattleRequirements.againstBetween(3,6));
normal.add(`You come upon a writhing mass of cockroaches, the floor itself seems to undulate as they start to swarm you.`, BattleRequirements.againstAtLeast(6));

ambush.add(`You're startled by a wet sounding thud from behind you as cockroaches suddenly start to drop from the ceiling!`);

surprise.add(`You come across a small cluster of cockroaches. They seem dormant, though they won't stay that way for long.`, BattleRequirements.againstAtMost(5));
surprise.add(`A swarm of cockroaches are busy feasting on something in the center of the room, giving you the chance to attack first.`, BattleRequirements.againstAtLeast(6));
