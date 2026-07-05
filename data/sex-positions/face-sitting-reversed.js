const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('face-sitting-reversed.rearrange');
const cowgirlReversed = WeaverPackage('face-sitting-reversed.move-to-cowgirl-reversed');
const lapSittingReversed = WeaverPackage('face-sitting-reversed.move-to-lap-sitting-reversed');
const faceSitting = WeaverPackage('face-sitting-reversed.move-to-face-sitting');
const sixtyNine = WeaverPackage('face-sitting-reversed.move-to-sixty-nine');

// First sitting on second's face, facing second's feet.
SexPosition.register('face-sitting-reversed',{
  name: 'Reversed Face Sitting',

  alignment: {
    first: {
      hands: [HandAlignment.breasts, HandAlignment.cock],
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: [CockAlignment.rubbed],
    },
  },

  moves:[
    { code:'cowgirl-reversed', package:cowgirlReversed, swap:true },
    { code:'lap-sitting-reversed', package:lapSittingReversed, swap:true },
    { code:'face-sitting', package:faceSitting },
    { code:'sixty-nine', package:sixtyNine },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to reverse face sitting with player on top with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to reverse face sitting with player on bottom with partner attitude {@attitude}]`, [playerB]);

cowgirlReversed.add(`[Shift to cowgirl reversed with player on bottom with partner attitude {@attitude}]`, [playerA]);
cowgirlReversed.add(`[Shift to cowgirl reversed with player on top with partner attitude {@attitude}]`, [playerB]);

lapSittingReversed.add(`[Shift to lap sitting reversed with player on bottom with partner attitude {@attitude}]`, [playerA]);
lapSittingReversed.add(`[Shift to lap sitting reversed with player on top with partner attitude {@attitude}]`, [playerB]);

faceSitting.add(`[Shift to face sitting with player on top with partner attitude {@attitude}]`, [playerA]);
faceSitting.add(`[Shift to face sitting with player on bottom with partner attitude {@attitude}]`, [playerB]);

sixtyNine.add(`[Shift to sixty nine with player on top with partner attitude {@attitude}]`, [playerA]);
sixtyNine.add(`[Shift to sixty nine with player on bottom with partner attitude {@attitude}]`, [playerB]);
