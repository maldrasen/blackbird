// First sitting on second's face, facing forward.
SexPosition.register('face-sitting',{
  name: 'Face Sitting',

  alignment: {
    first: {
      hands: HandAlignment.self,
      cock: CockAlignment.oral,
      ass: AssAlignment.oral,
    },
    second: {
      mouth: MouthAlignment.cock,
      hands: HandAlignment.any,
    },
  },

});
