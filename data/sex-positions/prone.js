// First is lying down receiving oral. Second has their head between first's
// legs, laying astride their legs.
SexPosition.register('prone',{
  name: 'Prone',

  alignment: {
    first: {
      hands: HandAlignment.self,
      cock: CockAlignment.oral,
      ass: AssAlignment.oral,
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: HandAlignment.any,
    },
  },

});
