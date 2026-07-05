const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('prone.rearrange');
const missionary = WeaverPackage('prone.move-to-missionary');
const sixtyNine = WeaverPackage('prone.move-to-sixty-nine');

// First is lying down receiving oral. Second has their head between first's
// legs, laying astride their legs.
SexPosition.register('prone',{
  name: 'Prone',

  alignment: {
    first: {
      hands: [HandAlignment.mouth],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      breasts: [BreastAlignment.cock],
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

  moves:[
    { code:'missionary', package:missionary, swap:true },
    { code:'sixty-nine', package:sixtyNine, swap:true },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to prone with player on bottom with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to prone with player on top with partner attitude {@attitude}]`, [playerB]);

missionary.add(`[Shift to missionary with player on top with partner attitude {@attitude}]`, [playerA]);
missionary.add(`[Shift to missionary with player on bottom with partner attitude {@attitude}]`, [playerB]);

sixtyNine.add(`[Shift to sixty nine with player on top with partner attitude {@attitude}]`, [playerA]);
sixtyNine.add(`[Shift to sixty nine with player on bottom with partner attitude {@attitude}]`, [playerB]);
