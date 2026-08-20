
const daggermawNormal = WeaverPackage('cohort.daggermaws.normal');
daggermawNormal.add(`A daggermaw pads into view, jaws parting hungrily!`);
daggermawNormal.add(`A daggermaw blocks the passage, all teeth and bad intentions!`);

const daggermawAmbush = WeaverPackage('cohort.daggermaws.party-ambushed');
daggermawAmbush.add(`A daggermaw lunges from the darkness, jaws snapping!`);
daggermawAmbush.add(`Too late, you notice the daggermaw stalking you!`);

const daggermawSurprised = WeaverPackage('cohort.daggermaws.monsters-ambushed');
daggermawSurprised.add(`You catch the daggermaw dozing over old bones!`);
daggermawSurprised.add(`The daggermaw is too busy gnawing a bone to notice you!`);

Cohort.register('daggermaws',{
  monsters:[
    'lesser-daggermaw',
  ],
  startText:{
    'normal': daggermawNormal,
    'party-ambushed': daggermawAmbush,
    'monsters-ambushed': daggermawSurprised,
  },
});

const roachNormal = WeaverPackage('cohort.roaches.normal');
roachNormal.add(`Revolting cockroaches swarm out of the cracks in the walls!`);
roachNormal.add(`The floor seethes — revolting cockroaches, everywhere!`);

const roachAmbush = WeaverPackage('cohort.roaches.party-ambushed');
roachAmbush.add(`Revolting cockroaches drop from the ceiling into your hair!`);
roachAmbush.add(`The wall behind you erupts with revolting cockroaches!`);

const roachSurprised = WeaverPackage('cohort.roaches.monsters-ambushed');
roachSurprised.add(`The revolting cockroaches are feasting on something best left unexamined, and don't notice you!`);
roachSurprised.add(`You come upon the revolting cockroaches before they can scatter!`);

Cohort.register('roaches',{
  monsters:[
    'revolting-cockroach',
    'revolting-horsecockroach',
  ],
  startText:{
    'normal': roachNormal,
    'party-ambushed': roachAmbush,
    'monsters-ambushed': roachSurprised,
  },
});

const skitterfangNormal = WeaverPackage('cohort.skitterfangs.normal');
skitterfangNormal.add(`A rabid skitterfang scuttles into view, foam dripping from its mandibles!`);
skitterfangNormal.add(`Rabid skitterfangs pour from a crack in the wall!`);

const skitterfangAmbush = WeaverPackage('cohort.skitterfangs.party-ambushed');
skitterfangAmbush.add(`A rabid skitterfang drops onto you from above!`);
skitterfangAmbush.add(`Skitterfangs burst from the rubble at your feet!`);

const skitterfangSurprised = WeaverPackage('cohort.skitterfangs.monsters-ambushed');
skitterfangSurprised.add(`You spot the skitterfangs before they spot you!`);
skitterfangSurprised.add(`The rabid skitterfangs are tearing at a carcass, oblivious to your approach!`);

Cohort.register('skitterfangs',{
  monsters:[
    'rabid-skitterfang',
  ],
  startText:{
    'normal': skitterfangNormal,
    'party-ambushed': skitterfangAmbush,
    'monsters-ambushed': skitterfangSurprised,
  },
});

const yeekNormal = WeaverPackage('cohort.yeeks.normal');
yeekNormal.add(`A mob of yeeks shambles toward you, hooting!`);
yeekNormal.add(`Yeeks emerge from the gloom, hooting a challenge!`);

const yeekAmbush = WeaverPackage('cohort.yeeks.party-ambushed');
yeekAmbush.add(`Yeeks burst from the rubble, hooting in triumph!`);
yeekAmbush.add(`A chorus of hoots — the yeeks were lying in wait!`);

const yeekSurprised = WeaverPackage('cohort.yeeks.monsters-ambushed');
yeekSurprised.add(`You catch the yeeks mid-grooming, utterly oblivious!`);
yeekSurprised.add(`The yeeks are hooting at each other and never see you coming!`);

Cohort.register('yeeks',{
  monsters:[
    'emerald-yeek',
    'slithering-yeek',
  ],
  startText:{
    'normal': yeekNormal,
    'party-ambushed': yeekAmbush,
    'monsters-ambushed': yeekSurprised,
  },
});
