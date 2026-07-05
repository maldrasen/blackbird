const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('face-sitting.rearrange');
const cowgirl = WeaverPackage('face-sitting.move-to-cowgirl');
const lapSitting = WeaverPackage('face-sitting.move-to-lap-sitting');
const faceSittingReversed = WeaverPackage('face-sitting.move-to-face-sitting-reversed');

// First sitting on second's face, facing forward. Cock sucking could
// technically be possible from this position, but it would require too many
// checks for things like throat depth, and the angle is weird.
SexPosition.register('face-sitting',{
  name: 'Face Sitting',

  alignment: {
    first: {
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

  moves:[
    { code:'cowgirl', package:cowgirl, swap:true },
    { code:'lap-sitting', package:lapSitting, swap:true },
    { code:'face-sitting-reversed', package:faceSittingReversed },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to face sitting with player on top with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to face sitting with player on bottom with partner attitude {@attitude}]`, [playerB]);

cowgirl.add(`[Shift to cowgirl with player on bottom with partner attitude {@attitude}]`, [playerA]);
cowgirl.add(`[Shift to cowgirl with player on top with partner attitude {@attitude}]`, [playerB]);

lapSitting.add(`[Shift to lap sitting with player on bottom with partner attitude {@attitude}]`, [playerA]);
lapSitting.add(`[Shift to lap sitting with player on top with partner attitude {@attitude}]`, [playerB]);

faceSittingReversed.add(`[Shift to face sitting reversed with player on top with partner attitude {@attitude}]`, [playerA]);
faceSittingReversed.add(`[Shift to face sitting reversed with player on bottom with partner attitude {@attitude}]`, [playerB]);
