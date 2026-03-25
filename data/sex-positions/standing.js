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
  // position. That gives us the correct alignment map to look at.
  moves:[
    { code:'kneeling', generator:moveKneeling },
    { code:'kneeling', generator:moveKneeling, swap:true },
    { code:'lap-sitting', generator:moveLapSitting },
    { code:'lap-sitting', generator:moveLapSitting, swap:true },
    { code:'missionary', generator:moveMissionary },
    { code:'missionary', generator:moveMissionary, swap:true },
    { code:'standing-reversed', generator:moveStandingReversed },
    { code:'standing-reversed', generator:moveStandingReversed, swap:true },
  ],
});

function moveKneeling(context) { return `[Mode:Kneeling]`; }
function moveLapSitting(context) { return `[Mode:LapSitting]`; }
function moveMissionary(context) { return `[Mode:Missionary]`; }
function moveStandingReversed(context) { return `[Mode:StandingReversed]`; }
