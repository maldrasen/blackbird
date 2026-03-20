// First standing in front of second. Second on knees in front of first.
SexPosition.register('kneeling',{
  name: 'Kneeling',

  alignment: {
    first: {
      hands: [HandAlignment.mouth],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.onlyPussyEaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

});
