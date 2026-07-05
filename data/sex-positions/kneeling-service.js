const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('kneeling-service.rearrange');
const centipede = WeaverPackage('kneeling-service.move-to-centipede');
const kneeling = WeaverPackage('kneeling-service.move-to-kneeling');
const standingReversed = WeaverPackage('kneeling-service.move-to-standing-reversed');
const lapSittingReversed = WeaverPackage('kneeling-service.move-to-lap-sitting-reversed');

// First standing with Second on knees behind first. (Rimming Position)
SexPosition.register('kneeling-service',{
  name: 'Service Kneeling',

  // Pussy eating is still possible from the kneeling behind position.
  alignment: {
    first: {
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass],
      hands: [HandAlignment.ass, HandAlignment.cock],
    },
  },

  moves:[
    { code:'centipede', package:centipede, swap:true },
    { code:'kneeling', package:kneeling },
    { code:'standing-reversed', package:standingReversed, swap:true },
    { code:'lap-sitting-reversed', package:lapSittingReversed, swap:true },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to kneeling service with player standing with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to kneeling service with player on knees with partner attitude {@attitude}]`, [playerB]);

centipede.add(`You bend over, kneeling on the ground, presenting your ass to {B:name}.`, [playerA]);
centipede.add(`{A:name} bends over, kneeling on the ground, presenting {A:his} ass to you.`, [playerB]);

kneeling.add(`[Shift to kneeling with player standing with partner attitude {@attitude}]`, [playerA]);
kneeling.add(`[Shift to kneeling with player kneeling with partner attitude {@attitude}]`, [playerB]);

standingReversed.add(`[Shift to standing reversed with player standing behind with partner attitude {@attitude}]`, [playerA]);
standingReversed.add(`[Shift to standing reversed with player standing in front with partner attitude {@attitude}]`, [playerB]);

lapSittingReversed.add(`[Shift to lap sitting reversed with player on bottom with partner attitude {@attitude}]`, [playerA]);
lapSittingReversed.add(`[Shift to lap sitting reversed with player on top with partner attitude {@attitude}]`, [playerB]);
