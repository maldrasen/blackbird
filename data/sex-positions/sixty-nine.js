// First lying on top of second, with faces aligned to crotches.
SexPosition.register('sixty-nine',{
  name: 'Sixty Nine',

  // Anilingus is possible from a sixty nine position, though the receiver's
  // legs have to be really pulled up.
  alignment: {
    first: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
  },

  moves:[
    { code:'face-sitting-reversed', generator:moveFaceSitting },
    { code:'missionary', generator:moveMissionary },
    { code:'prone', generator:moveProne },
  ],

});

function moveFaceSitting(context) { return `[Move:FaceSittingReversed]`; }
function moveMissionary(context) { return `[Move:Missionary]`; }
function moveProne(context) { return `[Move:Prone]`; }
