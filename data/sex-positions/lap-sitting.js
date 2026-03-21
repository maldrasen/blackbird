// Second straddling First's lap facing them.
SexPosition.register('lap-sitting',{
  name: 'Lap Sitting',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves:[
    { code:'standing', generator:moveStanding },
  ],

});

function moveStanding() {}
