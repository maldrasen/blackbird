// Second straddling First's lap facing away from them.
SexPosition.register('lap-sitting-reversed',{
  name: 'Reverse Lap Sitting',

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
    { code:'face-sitting-reversed', generator:moveFaceSitting },
    { code:'lap-sitting', generator:moveLapSitting },
    { code:'standing-reversed', generator:moveStanding },
  ],

});

function moveFaceSitting(context) { return `[Move:FaceSittingReversed]`; }
function moveLapSitting(context) { return `[Move:LapSitting]`; }
function moveStanding(context) { return `[Move:StandingReversed]`; }
