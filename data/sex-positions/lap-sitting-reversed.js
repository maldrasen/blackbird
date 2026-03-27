// Second straddling First's lap facing away from them.
SexPosition.register('lap-sitting-reversed',{
  name: 'Reverse Lap Sitting',

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

  moves:[
    { code:'face-sitting-reversed', generator:moveFaceSitting, swap:true },
    { code:'lap-sitting', generator:moveLapSitting },
    { code:'standing-reversed', generator:moveStanding },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to reverse lap sitting with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to reverse lap sitting with player on top with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveFaceSitting(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to face sitting reversed with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to face sitting reversed with player on bottom with partner attitude ${context.attitude}]`;
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

function moveStanding(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to standing reversed with player standing behind with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to standing reversed with player standing in front with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}
