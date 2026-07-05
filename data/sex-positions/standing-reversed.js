const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('standing-reversed.rearrange');
const centipede = WeaverPackage('standing-reversed.move-to-centipede');
const kneelingService = WeaverPackage('standing-reversed.move-to-kneeling-service');
const lapSittingReversed = WeaverPackage('standing-reversed.move-to-lap-sitting-reversed');
const spooning = WeaverPackage('standing-reversed.move-to-spooning');
const standing = WeaverPackage('standing-reversed.move-to-standing');

// First standing behind second, crotch pressed against ass. Second has back
// turned to first.
SexPosition.register('standing-reversed',{
  name: 'Reverse Standing',

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
    { code:'centipede', package:centipede },
    { code:'kneeling-service', package:kneelingService, swap:true },
    { code:'lap-sitting-reversed', package:lapSittingReversed },
    { code:'spooning', package:spooning },
    { code:'standing', package:standing },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to standing reversed with player behind partner with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to standing reversed with player in front of partner with partner attitude {@attitude}]`, [playerB]);

centipede.add(`[Shift to centipede with player in back with partner attitude {@attitude}]`, [playerA]);
centipede.add(`[Shift to centipede with player in front with partner attitude {@attitude}]`, [playerB]);

kneelingService.add(`[Shift to kneeling with player still standing with partner attitude {@attitude}]`, [playerA]);
kneelingService.add(`[Shift to kneeling with player kneeling with partner attitude {@attitude}]`, [playerB]);

lapSittingReversed.add(`[Shift to lap sitting reversed with player on bottom with partner attitude {@attitude}]`, [playerA]);
lapSittingReversed.add(`[Shift to lap sitting reversed with player on top with partner attitude {@attitude}]`, [playerB]);

spooning.add(`[Shift to spooning with player in back with partner attitude {@attitude}]`, [playerA]);
spooning.add(`[Shift to spooning with player in front with partner attitude {@attitude}]`, [playerB]);

standing.add(`[Shift to standing (partner turns around) with partner attitude {@attitude}]`, [playerA]);
standing.add(`[Shift to standing (player turns around) with partner attitude {@attitude}]`, [playerB]);
