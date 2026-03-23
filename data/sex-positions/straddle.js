// First straddling second's waist. Second lying face down. Standard massage
// position. Penetration is possible, but a handjob is not.
SexPosition.register('straddle',{
  name: 'Straddle',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.mouth],
      cock: [CockAlignment.fucked],
    },
    second: {
      ass: [AssAlignment.fucked],
    },
  },

  moves:[
    { code:'centipede', generator:moveCentipede },
    { code:'cowgirl', generator:moveCowgirl },
    { code:'doggy-style', generator:moveDoggyStyle },
    { code:'missionary-reverse', generator:moveMissionary },
  ],

});

function moveCentipede(context) { return `[Move:Centipede]`; }
function moveCowgirl(context) { return `[Move:Cowgirl]`; }
function moveDoggyStyle(context) { return `[Move:DoggyStyle]`; }
function moveMissionary(context) { return `[Move:MissionaryReverse]`; }
