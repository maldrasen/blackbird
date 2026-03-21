// First on knees, thrusting into second from behind. Second bent over in front of first.
SexPosition.register('doggy-style',{
  name: 'Doggy Style',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves: [
    { code:'centipede', generator:moveCentipede },
  ],

});

// First bends over further, pushing their face into Second's ass.
function moveCentipede(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    options.push(`You bend over further, pushing your face into {B:name's} ass.`);
  }

  if (b.isPlayer()) {
    options.push(`You feel {A:name} bending down behind you, pushing {A:his} face into your ass.`);
  }

  return Random.from(options);
}
