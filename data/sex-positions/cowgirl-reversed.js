// First on bottom, laying down. Second straddling their waist facing first's feet.
SexPosition.register('cowgirl-reversed',{
  name: 'Reverse Cowgirl',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: CockAlignment.penetrate,
    },
    second: {
      cock: CockAlignment.frottage,
      ass: AssAlignment.penetrate,
    },
  },

});
