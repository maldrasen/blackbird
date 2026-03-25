// First on bottom, laying down. Second straddling their waist facing first's feet.
SexPosition.register('cowgirl-reversed',{
  name: 'Reverse Cowgirl',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves:[
    { code:'cowgirl', generator:moveCowgirl },
    { code:'face-sitting-reversed', generator:moveFaceSitting, swap:true },
  ],

});

function moveCowgirl(context) { return `[Move:Cowgirl]`; }
function moveFaceSitting(context) { return `[Move:FaceSittingReversed]`; }
