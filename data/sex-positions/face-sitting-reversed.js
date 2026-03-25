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
    { code:'cowgirl-reversed', generator:moveCowgirl, swap:true },
    { code:'lap-sitting-reversed', generator:moveLapSitting, swap:true },
    { code:'face-sitting', generator:moveFaceSitting },
    { code:'sixty-nine', generator:moveSixtyNine },
  ],

});

function moveCowgirl(context) { return `[Move:CowgirlReversed]`; }
function moveLapSitting(context) { return `[Move:LapSittingReversed]`; }
function moveFaceSitting(context) { return `[Move:FaceSitting]`; }
function moveSixtyNine(context) { return `[Move:SixtyNine]`; }
