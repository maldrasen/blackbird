// First lying on top of Second. Second lying face down.
SexPosition.register('reverse-missionary',{
  name: 'Reverse Missionary',

  // Reaching down under the second person to grab their cock is difficult
  // unless they're raising their ass up, but not so much that this becomes a
  // different position.
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
    { code:'doggy-style', generator:moveDoggyStyle },
    { code:'missionary', generator:moveMissionary },
    { code:'spooning', generator:moveSpooning },
    { code:'straddle', generator:moveStraddle },
  ],

});

function moveDoggyStyle(context) { return `[Move:DoggyStyle]`; }
function moveMissionary(context) { return `[Move:Missionary]`; }
function moveSpooning(context) { return `[Move:Spooning]`; }
function moveStraddle(context) { return `[Move:Straddle]`; }
