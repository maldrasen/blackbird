// First lying on top of Second. Second lying face up, legs spread.
SexPosition.register('missionary',{
  name: 'Missionary',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
      ass: [AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  // We can move from standing to missionary, but not back to standing.
  moves:[
    { code:'lap-sitting', generator:moveLapSitting },
    { code:'missionary-reversed', generator:moveMissionary },
    { code:'prone', generator:moveProne },
    { code:'sixty-nine', generator:moveSixtyNine },
  ],

});

function moveLapSitting(context) { return `[Move:LapSitting]`; }
function moveMissionary(context) { return `[Move:MissionaryReversed]`; }
function moveProne(context) { return `[Move:Prone]`; }
function moveSixtyNine(context) { return `[Move:SixtyNine]`; }
