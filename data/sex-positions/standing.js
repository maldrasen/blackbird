// First and Second standing in front of each other, facing each other.
SexPosition.register('standing',{
  name: 'Standing',

  alignment: {
    first: {
      mouth: MouthAlignment.mouth,
      hands: HandAlignment.any,
      cock: CockAlignment.penetrate,
      ass: AssAlignment.penetrate,
    },
    second: {
      mouth: MouthAlignment.mouth,
      hands: HandAlignment.any,
      cock: CockAlignment.penetrate,
      ass: AssAlignment.penetrate,
    },
  },

});
