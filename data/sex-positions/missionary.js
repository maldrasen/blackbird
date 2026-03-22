// First lying on top of Second. Second lying face up, legs spread.
SexPosition.register('missionary',{
  name: 'Missionary',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
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
  ],

});

function moveLapSitting(context) { return `[Move:LapSitting]`; }
