// First and Second standing in front of each other, facing each other.
SexPosition.register('standing',{
  name: 'Standing',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: CockAlignment.penetrate,
      ass: AssAlignment.penetrate,
    },
    second: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: CockAlignment.penetrate,
      ass: AssAlignment.penetrate,
    },
  },

});
