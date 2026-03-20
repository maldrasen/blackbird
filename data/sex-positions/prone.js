// First is lying down receiving oral. Second has their head between first's
// legs, laying astride their legs.
SexPosition.register('prone',{
  name: 'Prone',

  alignment: {
    first: {
      hands: [HandAlignment.mouth],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

});
