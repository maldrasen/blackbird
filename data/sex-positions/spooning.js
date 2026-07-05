const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('spooning.rearrange');
const doggyStyle = WeaverPackage('spooning.move-to-doggy-style');
const missionaryReversed = WeaverPackage('spooning.move-to-missionary-reversed');

// First lying on side behind Second. Second has back to first.
SexPosition.register('spooning',{
  name: 'Spooning',

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

  // We can move from standing reversed to spooning, but not back to standing.
  moves:[
    { code:'doggy-style', package:doggyStyle },
    { code:'missionary-reversed', package:missionaryReversed },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to spooning with player behind partner with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to spooning with player in front of partner with partner attitude {@attitude}]`, [playerB]);

doggyStyle.add(`[Shift to doggy style with player in back with partner attitude {@attitude}]`, [playerA]);
doggyStyle.add(`[Shift to doggy style with player in front with partner attitude {@attitude}]`, [playerB]);

missionaryReversed.add(`[Shift to missionary with player on top with partner attitude {@attitude}]`, [playerA]);
missionaryReversed.add(`[Shift to missionary with player on bottom with partner attitude {@attitude}]`, [playerB]);
