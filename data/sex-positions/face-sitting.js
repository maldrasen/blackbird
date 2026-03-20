// First sitting on second's face, facing forward. Cock sucking could
// technically be possible from this position, but it would require too many
// checks for things like throat depth, and the angle is weird.
SexPosition.register('face-sitting',{
  name: 'Face Sitting',

  alignment: {
    first: {
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

});
