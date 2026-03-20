// First on bottom, laying down. Second straddling their waist facing first's head.
SexPosition.register('cowgirl',{
  name: 'Cowgirl',

  alignment: {
    first: {
      hands: HandAlignment.any,
      cock: CockAlignment.penetrate,
    },
    second: {
      hands: HandAlignment.front,
      cock: CockAlignment.frottage,
      ass: AssAlignment.penetrate,
    },
  },

});
