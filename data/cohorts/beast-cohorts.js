
const daggermawNormal = WeaverPackage('cohort.daggermaws.normal');
daggermawNormal.add(``, BattleRequirements.againstSingle());
daggermawNormal.add(``, BattleRequirements.againstMultiple());

const daggermawAmbush = WeaverPackage('cohort.daggermaws.party-ambushed');
daggermawAmbush.add(``, BattleRequirements.againstSingle());
daggermawAmbush.add(``, BattleRequirements.againstMultiple());

const daggermawSurprised = WeaverPackage('cohort.daggermaws.monsters-ambushed');
daggermawSurprised.add(``, BattleRequirements.againstSingle());
daggermawSurprised.add(``, BattleRequirements.againstMultiple());

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
skitterfangNormal.add(``);

const skitterfangAmbush = WeaverPackage('cohort.skitterfangs.party-ambushed');
skitterfangAmbush.add(``);

const skitterfangSurprised = WeaverPackage('cohort.skitterfangs.monsters-ambushed');
skitterfangSurprised.add(``);

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
yeekNormal.add(``, BattleRequirements.againstSingle());
yeekNormal.add(``, BattleRequirements.againstMultiple());

const yeekAmbush = WeaverPackage('cohort.yeeks.party-ambushed');
yeekAmbush.add(``, BattleRequirements.againstSingle());
yeekAmbush.add(``, BattleRequirements.againstMultiple());

const yeekSurprised = WeaverPackage('cohort.yeeks.monsters-ambushed');
yeekSurprised.add(``, BattleRequirements.againstSingle());
yeekSurprised.add(``, BattleRequirements.againstMultiple());

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
