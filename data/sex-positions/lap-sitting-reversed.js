const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('lap-sitting-reversed.rearrange');
const faceSittingReversed = WeaverPackage('lap-sitting-reversed.move-to-face-sitting-reversed');
const lapSitting = WeaverPackage('lap-sitting-reversed.move-to-lap-sitting');
const standingReversed = WeaverPackage('lap-sitting-reversed.move-to-standing-reversed');

// Second straddling First's lap facing away from them.
SexPosition.register('lap-sitting-reversed',{
  name: 'Reverse Lap Sitting',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.fucked],
    },
    second: {
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves:[
    { code:'face-sitting-reversed', package:faceSittingReversed, swap:true },
    { code:'lap-sitting', package:lapSitting },
    { code:'standing-reversed', package:standingReversed },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to reverse lap sitting with player on bottom with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to reverse lap sitting with player on top with partner attitude {@attitude}]`, [playerB]);

faceSittingReversed.add(`[Shift to face sitting reversed with player on top with partner attitude {@attitude}]`, [playerA]);
faceSittingReversed.add(`[Shift to face sitting reversed with player on bottom with partner attitude {@attitude}]`, [playerB]);

lapSitting.add(`[Shift to lap sitting reversed with player on bottom with partner attitude {@attitude}]`, [playerA]);
lapSitting.add(`[Shift to lap sitting reversed with player on top with partner attitude {@attitude}]`, [playerB]);

standingReversed.add(`[Shift to standing reversed with player standing behind with partner attitude {@attitude}]`, [playerA]);
standingReversed.add(`[Shift to standing reversed with player standing in front with partner attitude {@attitude}]`, [playerB]);
