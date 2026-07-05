const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('missionary-reversed.rearrange');
const doggyStyle = WeaverPackage('missionary-reversed.move-to-doggy-style');
const missionary = WeaverPackage('missionary-reversed.move-to-missionary');
const spooning = WeaverPackage('missionary-reversed.move-to-spooning');
const straddle = WeaverPackage('missionary-reversed.move-to-straddle');

// First lying on top of Second. Second lying face down.
SexPosition.register('missionary-reversed',{
  name: 'Reverse Missionary',

  // Reaching down under the second person to grab their cock is difficult
  // unless they're raising their ass up, but not so much that this becomes a
  // different position.
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
    { code:'doggy-style', package:doggyStyle },
    { code:'missionary', package:missionary },
    { code:'spooning', package:spooning },
    { code:'straddle', package:straddle },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to missionary reversed with player on top with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to missionary reversed with player on bottom with partner attitude {@attitude}]`, [playerB]);

doggyStyle.add(`[Shift to doggy style with player in back with partner attitude {@attitude}]`, [playerA]);
doggyStyle.add(`[Shift to doggy style with player in front with partner attitude {@attitude}]`, [playerB]);

missionary.add(`[Shift to missionary with player on top with partner attitude {@attitude}]`, [playerA]);
missionary.add(`[Shift to missionary with player on bottom with partner attitude {@attitude}]`, [playerB]);

spooning.add(`[Shift to spooning with player in back with partner attitude {@attitude}]`, [playerA]);
spooning.add(`[Shift to spooning with player in front with partner attitude {@attitude}]`, [playerB]);

straddle.add(`[Shift to straddle with player on top with partner attitude {@attitude}]`, [playerA]);
straddle.add(`[Shift to straddle with player on bottom with partner attitude {@attitude}]`, [playerB]);
