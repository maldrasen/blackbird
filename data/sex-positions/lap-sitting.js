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
    { code:'face-sitting', generator:moveFaceSitting, swap:true },
    { code:'lap-sitting-reversed', generator:moveLapSitting },
    { code:'missionary', generator:moveMissionary, swap:true },
    { code:'standing', generator:moveStanding },
  ],

});

function moveFaceSitting(context) { return `[Move:FaceSitting]`; }
function moveLapSitting(context) { return `[Move:LapSittingReversed]`; }
function moveMissionary(context) { return `[Move:Missionary]`; }
function moveStanding(context) { return `[Move:Standing]`; }
