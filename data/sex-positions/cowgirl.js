// First on bottom, laying down. Second straddling their waist facing first's head.
SexPosition.register('cowgirl',{
  name: 'Cowgirl',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: CockAlignment.penetrate,
    },
    second: {
      hands: [HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: CockAlignment.frottage,
      ass: AssAlignment.penetrate,
    },
  },

});
