// First standing with Second on knees behind first. (Rimming Position)
SexPosition.register('kneeling-service',{
  name: 'Service Kneeling',

  // Pussy eating is still possible from the kneeling behind position.
  alignment: {
    first: {
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass],
      hands: [HandAlignment.ass, HandAlignment.cock],
    },
  },

  moves:[
    { code: 'centipede', generator:moveCentipede, switch:true },
  ]
});

function moveCentipede(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    options.push('You bend over, kneeling on the ground, presenting your ass to {B:name}.');
  }
  if (b.isPlayer()) {
    options.push('{A:name} bends over, kneeling on the ground, presenting {A:his} ass to you.');
  }

  return Random.from(options);
}
