// First sitting on second's face, facing second's feet.
SexPosition.register('face-sitting-reversed',{
  name: 'Reversed Face Sitting',

  alignment: {
    first: {
      hands: [HandAlignment.breasts, HandAlignment.cock],
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: [CockAlignment.rubbed],
    },
  },

  moves:[
    { code:'cowgirl-reversed', generator:moveCowgirl, swap:true },
    { code:'lap-sitting-reversed', generator:moveLapSitting, swap:true },
    { code:'face-sitting', generator:moveFaceSitting },
    { code:'sixty-nine', generator:moveSixtyNine },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to reverse face sitting with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to reverse face sitting with player on bottom with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveCowgirl(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to cowgirl reversed with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to cowgirl reversed with player on top with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveLapSitting(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to lap sitting reversed with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to lap sitting reversed with player on top with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveFaceSitting(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to face sitting with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to face sitting with player on bottom with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveSixtyNine(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to sixty nine with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to sixty nine with player on bottom with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}
