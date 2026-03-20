// First sitting on second's face, facing forward.
SexPosition.register('face-sitting',{
  name: 'Face Sitting',

  // It's possible to suck cock from a face sat upon position. It's really
  // having a cock pointed downward while it's lowered down it into your mouth
  // though really. Could just detect that in the action text and make it into
  // more of a sucking on balls action.
  alignment: {
    first: {
      cock: CockAlignment.oral,
      ass: AssAlignment.oral,
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

});
