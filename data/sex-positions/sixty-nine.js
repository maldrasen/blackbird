const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('sixty-nine.rearrange');
const faceSittingReversed = WeaverPackage('sixty-nine.move-to-face-sitting-reversed');
const missionary = WeaverPackage('sixty-nine.move-to-missionary');
const prone = WeaverPackage('sixty-nine.move-to-prone');

// First lying on top of second, with faces aligned to crotches.
SexPosition.register('sixty-nine',{
  name: 'Sixty Nine',

  // Anilingus is possible from a sixty nine position, though the receiver's
  // legs have to be really pulled up.
  alignment: {
    first: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
  },

  moves:[
    { code:'face-sitting-reversed', package:faceSittingReversed },
    { code:'missionary', package:missionary },
    { code:'prone', package:prone, swap:true },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to sixty nine with player on top with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to sixty nine with player on bottom with partner attitude {@attitude}]`, [playerB]);

faceSittingReversed.add(`[Shift to face sitting reversed with player on top with partner attitude {@attitude}]`, [playerA]);
faceSittingReversed.add(`[Shift to face sitting reversed with player on bottom with partner attitude {@attitude}]`, [playerB]);

missionary.add(`[Shift to missionary with player on top with partner attitude {@attitude}]`, [playerA]);
missionary.add(`[Shift to missionary with player on bottom with partner attitude {@attitude}]`, [playerB]);

prone.add(`[Shift to prone with player on bottom (receiving) with partner attitude {@attitude}]`, [playerA]);
prone.add(`[Shift to prone with player on top (giving) with partner attitude {@attitude}]`, [playerB]);
