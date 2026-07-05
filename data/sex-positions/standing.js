const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const rearrange = WeaverPackage('standing.rearrange');
const kneeling = WeaverPackage('standing.move-to-kneeling');
const lapSitting = WeaverPackage('standing.move-to-lap-sitting');
const missionary = WeaverPackage('standing.move-to-missionary');
const standingReversed = WeaverPackage('standing.move-to-standing-reversed');

// First and Second standing in front of each other, facing each other.
SexPosition.register('standing',{
  name: 'Standing',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
    second: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  // There are two ways to get to standing reversed. Either the first person turns around or the second person turns
  // around. This is meaningful because partner standing behind player is very different from player standing behind
  // partner. This becomes important when we need to determine if this position works for how the next action needs
  // the character's parts to be aligned. Standing reversed A>B might work where standing reversed B>A would not. So,
  // when considering if a move works or not, we need to look at which roles the actors end up in each possible
  // position. That gives us the correct alignment map to look at. Both directions share the same package; the
  // playerIs requirements sort out which text fits the roles the actors ended up in.
  moves:[
    { code:'kneeling', package:kneeling },
    { code:'kneeling', package:kneeling, swap:true },
    { code:'lap-sitting', package:lapSitting },
    { code:'lap-sitting', package:lapSitting, swap:true },
    { code:'missionary', package:missionary },
    { code:'missionary', package:missionary, swap:true },
    { code:'standing-reversed', package:standingReversed },
    { code:'standing-reversed', package:standingReversed, swap:true },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`[Rearrange to standing with partner attitude {@attitude}]`);

kneeling.add(`[Shift to kneeling with player still standing with partner attitude {@attitude}]`, [playerA]);
kneeling.add(`[Shift to kneeling with player kneeling with partner attitude {@attitude}]`, [playerB]);

lapSitting.add(`[Shift to lap sitting with player on bottom with partner attitude {@attitude}]`, [playerA]);
lapSitting.add(`[Shift to lap sitting with player on top with partner attitude {@attitude}]`, [playerB]);

missionary.add(`[Shift to missionary with player on top with partner attitude {@attitude}]`, [playerA]);
missionary.add(`[Shift to missionary with player on bottom with partner attitude {@attitude}]`, [playerB]);

standingReversed.add(`[Shift to standing reversed with player standing behind with partner attitude {@attitude}]`, [playerA]);
standingReversed.add(`[Shift to standing reversed with player standing in front with partner attitude {@attitude}]`, [playerB]);
