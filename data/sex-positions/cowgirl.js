// First on bottom, laying down. Second straddling their waist facing first's head.
SexPosition.register('cowgirl',{
  name: 'Cowgirl',

  // Pussy fingering from the cowgirl position is awkward and difficult, but
  // technically possible. Should this have a difficulty penalty maybe?
  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      hands: [HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

});
