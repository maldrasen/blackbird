// First lying on top of second, with faces aligned to crotches.
SexPosition.register('sixty-nine',{
  name: 'Sixty Nine',

  // Anilingus is possible from a sixty nine position, though the receiver's
  // legs have to be really pulled up.
  alignment: {
    first: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
  },

  moves:[
    { code:'face-sitting-reversed', generator:moveFaceSitting },
    { code:'missionary', generator:moveMissionary },
    { code:'prone', generator:moveProne, swap:true },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to sixty nine with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to sixty nine with player on bottom with partner attitude ${context.attitude}]`;
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

function moveProne(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to prone with player on bottom (receiving) with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to prone with player on top (giving) with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}
