// First straddling second's waist. Second lying face down. Standard massage
// position. Penetration is possible, but a handjob is not.
SexPosition.register('straddle',{
  name: 'Straddle',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.mouth],
      cock: [CockAlignment.fucked],
    },
    second: {
      ass: [AssAlignment.fucked],
    },
  },

  moves:[
    { code:'centipede', generator:moveCentipede },
    { code:'cowgirl', generator:moveCowgirl, swap:true },
    { code:'doggy-style', generator:moveDoggyStyle },
    { code:'missionary-reverse', generator:moveMissionary },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to straddle with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to straddle with player on bottom with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveCentipede(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to centipede with player in back with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to centipede with player in front with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveCowgirl(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to cowgirl with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to cowgirl with player on top with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveDoggyStyle(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to doggy style with player in back with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to doggy style with player in front with partner attitude ${context.attitude}]`;
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
