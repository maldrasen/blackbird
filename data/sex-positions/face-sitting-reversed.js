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
    { code:'sixty-nine', generator:moveSixtyNine },
  ],

});

function moveSixtyNine(context) { return `[Move:SixtyNine]`; }
