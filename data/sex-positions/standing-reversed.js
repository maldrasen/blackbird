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
    { code:'lap-sitting-reversed', generator:moveLapSitting },
    { code:'spooning', generator:moveSpooning },
    { code:'standing', generator:moveStanding },
  ],

});

function moveSpooning(context) {}
function moveStanding(context) {}
function moveLapSitting(context) {}
