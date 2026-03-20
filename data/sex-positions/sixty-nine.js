// First lying on top of second, with faces aligned to crotches.
SexPosition.register('sixty-nine',{
  name: 'Sixty Nine',

  alignment: {
    first: {
      mouth: MouthAlignment.cock,
      hands: HandAlignment.bottom,
      cock: CockAlignment.oral,
      ass: AssAlignment.oral,
    },
    second: {
      mouth: MouthAlignment.cock,
      hands: HandAlignment.any,
      cock: CockAlignment.oral,
      ass: AssAlignment.oral,
    },
  },

});
