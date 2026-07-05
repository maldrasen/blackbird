const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('lap-sitting.rearrange');
const faceSitting = WeaverPackage('lap-sitting.move-to-face-sitting');
const lapSittingReversed = WeaverPackage('lap-sitting.move-to-lap-sitting-reversed');
const missionary = WeaverPackage('lap-sitting.move-to-missionary');
const standing = WeaverPackage('lap-sitting.move-to-standing');

// Second straddling First's lap facing them.
SexPosition.register('lap-sitting',{
  name: 'Lap Sitting',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves:[
    { code:'face-sitting', package:faceSitting, swap:true },
    { code:'lap-sitting-reversed', package:lapSittingReversed },
    { code:'missionary', package:missionary, swap:true },
    { code:'standing', package:standing },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to lap sitting with player on bottom with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to lap sitting with player on top with partner attitude {@attitude}]`, [playerB]);

faceSitting.add(`[Shift to face sitting with player on top with partner attitude {@attitude}]`, [playerA]);
faceSitting.add(`[Shift to face sitting with player on bottom with partner attitude {@attitude}]`, [playerB]);

lapSittingReversed.add(`[Shift to lap sitting reversed with player on bottom with partner attitude {@attitude}]`, [playerA]);
lapSittingReversed.add(`[Shift to lap sitting reversed with player on top with partner attitude {@attitude}]`, [playerB]);

missionary.add(`[Shift to missionary with player on top with partner attitude {@attitude}]`, [playerA]);
missionary.add(`[Shift to missionary with player on bottom with partner attitude {@attitude}]`, [playerB]);

standing.add(`[Shift to standing with partner attitude {@attitude}]`);
