
const daggermawNormal = WeaverPackage('cohort.daggermaws.normal');
daggermawNormal.add(`You open the door to the room to find a large daggermaw already charging towards you.`, BattleRequirements.againstSingle());
daggermawNormal.add(`A group of daggermaws charge at you, their circular mouths gnashing hungrily.`, BattleRequirements.againstMultiple());

const daggermawAmbush = WeaverPackage('cohort.daggermaws.party-ambushed');
daggermawAmbush.add(`The stone floor at your feet suddenly cracks and a large daggermaw bursts from the ground before you.`, BattleRequirements.againstSingle());
daggermawAmbush.add(`One of the room's stone walls suddenly crumbles as daggermaws burrow their way though it.`, BattleRequirements.againstMultiple());

const daggermawSurprised = WeaverPackage('cohort.daggermaws.monsters-ambushed');
daggermawSurprised.add(`You find a lone daggermaw, coiled in the corner of the room, seemingly asleep.`, BattleRequirements.againstSingle());
daggermawSurprised.add(`You come across a group of daggermaws, busy either fighting or mating; it's hard to tell which.`, BattleRequirements.againstMultiple());

Cohort.register('daggermaws',{
  maximum: 5,
  monsters:[
    'lesser-daggermaw',
  ],
  startText:{
    normal: daggermawNormal,
    partyAmbushed: daggermawAmbush,
    monstersAmbushed: daggermawSurprised,
  },
});

// =============================================================================

const roachNormal = WeaverPackage('cohort.roaches.normal');
roachNormal.add(`As you enter the room, cockroaches begin to squeeze out from cracks in the wall.`, BattleRequirements.againstAtMost(3));
roachNormal.add(`A large group of cockroaches erupt from the shadows.`, BattleRequirements.againstBetween(3,6));
roachNormal.add(`You come upon a writhing mass of cockroaches, the floor itself seems to undulate as they start to swarm you.`, BattleRequirements.againstAtLeast(6));

const roachAmbush = WeaverPackage('cohort.roaches.party-ambushed');
roachAmbush.add(`You're startled by a wet sounding thud from behind you as cockroaches suddenly start to drop from the ceiling!`);

const roachSurprised = WeaverPackage('cohort.roaches.monsters-ambushed');
roachSurprised.add(`You come across a small cluster of cockroaches. They seem dormant, though they won't stay that way for long.`, BattleRequirements.againstAtMost(5));
roachSurprised.add(`A swarm of cockroaches are busy feasting on something in the center of the room, giving you the chance to attack first.`, BattleRequirements.againstAtLeast(6));

Cohort.register('roaches',{
  minimum: 3,
  monsters:[
    'revolting-cockroach',
    'revolting-horsecockroach',
  ],
  startText:{
    normal: roachNormal,
    partyAmbushed: roachAmbush,
    monstersAmbushed: roachSurprised,
  },
});

// =============================================================================

const skitterfangNormal = WeaverPackage('cohort.skitterfangs.normal');
skitterfangNormal.add(`A pack of rabid little beasts, made of teeth and anger, bursts out of the shadows to attack you. `, BattleRequirements.againstAtMost(5));
skitterfangNormal.add(`A large horde of skitterfangs leap from the shadows.`, BattleRequirements.againstAtLeast(6));

const skitterfangAmbush = WeaverPackage('cohort.skitterfangs.party-ambushed');
skitterfangAmbush.add(`You walk into the room, unaware that a pack of skitterfangs were lurking in an alcove above the doorway.`);

const skitterfangSurprised = WeaverPackage('cohort.skitterfangs.monsters-ambushed');
skitterfangSurprised.add(`You some across a group of skitterfangs quickly devouring a corpse in the center of the room. They're too distracted by their feast to notice you.`);

Cohort.register('skitterfangs',{
  minimum: 3,
  monsters:[
    'rabid-skitterfang',
  ],
  startText:{
    normal: skitterfangNormal,
    partyAmbushed: skitterfangAmbush,
    monstersAmbushed: skitterfangSurprised,
  },
});

// =============================================================================

const yeekNormal = WeaverPackage('cohort.yeeks.normal');
yeekNormal.add(`A single yeek looks up as you enter the room. It opens it's fanged mouth, letting out an ear splitting, "YEEEK!" before charging you. `, BattleRequirements.againstSingle());
yeekNormal.add(`As you enter the room you spot a group of yeeks, their reptilian bodies clinging to of the walls.`, BattleRequirements.againstMultiple());

const yeekAmbush = WeaverPackage('cohort.yeeks.party-ambushed');
yeekAmbush.add(`A yeek, clinging to the ceiling, suddenly drops on you as you enter the room.`, BattleRequirements.againstSingle());
yeekAmbush.add(`You pull the door open, shocked to see that back of the wooden door is covered in clinging yeeks.`, BattleRequirements.againstMultiple());

const yeekSurprised = WeaverPackage('cohort.yeeks.monsters-ambushed');
yeekSurprised.add(`A yeek lies curled up on the floor, moving sluggishly as it wakes.`, BattleRequirements.againstSingle());
yeekSurprised.add(`You come across a group of sleeping yeeks. They begin to stir, but for a moment, you have the upper hand.`, BattleRequirements.againstMultiple());

Cohort.register('yeeks',{
  monsters:[
    'emerald-yeek',
    'slithering-yeek',
  ],
  startText:{
    normal: yeekNormal,
    partyAmbushed: yeekAmbush,
    monstersAmbushed: yeekSurprised,
  },
});
