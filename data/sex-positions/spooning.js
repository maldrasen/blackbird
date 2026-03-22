// First lying on side behind Second. Second has back to first.
SexPosition.register('spooning',{
  name: 'Spooning',

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

  // We can move from standing reversed to spooning, but not back to standing.
  moves:[
    { code:'doggy-style', generator:moveDoggyStyle },
    { code:'missionary-reversed', generator:moveMissionary },
  ],

});

function moveDoggyStyle(context) { return `[Move:DoggyStyle]`; }
function moveMissionary(context) { return `[Move:MissionaryReversed]`; }
