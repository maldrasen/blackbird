
const normal = WeaverPackage('cohort.gnawbones.N');
normal.add(`TODO: Gnawbones attack`);

const ambush = WeaverPackage('cohort.gnawbones.PA');
ambush.add(`TODO: Gnawbones surprise you.`);

const surprise = WeaverPackage('cohort.gnawbones.MA');
surprise.add(`TODO: You surprise gnawbones.`);

Cohort.register('gnawbones',{
  minimum: 1,
  monsters:[
    'gnawbones'
  ],
  startText:{
    normal: normal,
    partyAmbushed: ambush,
    monstersAmbushed: surprise,
  },
});
