// First lying on top of Second. Second lying face up, legs spread.
SexPosition.register('missionary',{
  name: 'Missionary',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: HandAlignment.front,
      cock: CockAlignment.penetrate,
      ass: AssAlignment.fingered,
    },
    second: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: HandAlignment.any,
      cock: CockAlignment.penetrate,
    },
  },

});
