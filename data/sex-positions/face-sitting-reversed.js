// First sitting on second's face, facing second's feet.
SexPosition.register('face-sitting-reversed',{
  name: 'Reversed Face Sitting',

  alignment: {
    first: {
      hands: HandAlignment.front,
      cock: CockAlignment.oral,
      ass: AssAlignment.oral,
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: HandAlignment.bottom,
    },
  },

});
