const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('kneeling.rearrange');
const standing = WeaverPackage('kneeling.move-to-standing');
const kneelingService = WeaverPackage('kneeling.move-to-kneeling-service');

// First standing in front of second. Second on knees in front of first.
SexPosition.register('kneeling',{
  name: 'Kneeling',

  alignment: {
    first: {
      hands: [HandAlignment.mouth],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.onlyPussyEaten, AssAlignment.fingered],
    },
    second: {
      breasts: [BreastAlignment.cock],
      mouth: [MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

  moves:[
    { code:'standing', package:standing },
    { code:'kneeling-service', package:kneelingService },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to kneeling with player standing with partner attitude {@attitude}]`, [playerA]);
rearrange.add(`[Rearrange to kneeling with player on knees with partner attitude {@attitude}]`, [playerB]);

// The context now includes the previousPosition so that we can figure out which character is standing. We'll need a
// new closure that figures out which character wasn't standing in the last position.
standing.add(`[Shift to standing with partner attitude {@attitude}]`);

kneelingService.add(`[Shift to kneeling service with player standing with partner attitude {@attitude}]`, [playerA]);
kneelingService.add(`[Shift to kneeling service with player kneeling with partner attitude {@attitude}]`, [playerB]);
