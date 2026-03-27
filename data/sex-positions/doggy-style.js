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
    { code:'missionary-reversed', generator:moveMissionary },
    { code:'spooning', generator:moveSpooning },
    { code:'straddle', generator:moveStraddle },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to doggy style with player in back with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to doggy style with player in front with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

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

function moveMissionary(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to missionary reversed with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to missionary reversed with player on bottom with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveSpooning(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to spooning with player in back with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to spooning with player in front with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveStraddle(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to straddle with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to straddle with player on bottom with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}
