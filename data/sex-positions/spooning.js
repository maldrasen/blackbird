// First lying on side behind Second. Second has back to first.
SexPosition.register('spooning',{
  name: 'Spooning',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.fucked],
    },
    second: {
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  // We can move from standing reversed to spooning, but not back to standing.
  moves:[
    { code:'doggy-style', generator:moveDoggyStyle },
    { code:'missionary-reversed', generator:moveMissionary },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to spooning with player behind partner with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to spooning with player in front of partner with partner attitude ${context.attitude}]`;
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
    return `[Shift to missionary with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to missionary with player on bottom with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}
