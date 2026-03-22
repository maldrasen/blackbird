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
    { code:'centipede', generator:moveCentipede },
    { code:'kneeling-service', generator:moveKneeling },
    { code:'lap-sitting-reversed', generator:moveLapSitting },
    { code:'spooning', generator:moveSpooning },
    { code:'standing', generator:moveStanding },
  ],

});

function moveCentipede(context) { return `[Move:Centipede]`; }
function moveKneeling(context) { return `[Move:KneelingService]`; }
function moveLapSitting(context) { return `[Move:LapSittingReversed]`; }
function moveSpooning(context) { return `[Move:Spooning]`; }
function moveStanding(context) { return `[Move:Standing]`; }
