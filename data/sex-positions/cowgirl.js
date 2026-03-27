// First on bottom, laying down. Second straddling their waist facing first's head.
SexPosition.register('cowgirl',{
  name: 'Cowgirl',

  // Pussy fingering from the cowgirl position is awkward and difficult, but
  // technically possible. Should this have a difficulty penalty maybe?
  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      hands: [HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves:[
    { code:'cowgirl-reversed', generator:moveCowgirl },
    { code:'face-sitting', generator:moveFaceSitting, swap:true },
    { code:'straddle', generator:moveStraddle, swap:true },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to cowgirl with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to cowgirl with player on top with partner attitude ${context.attitude}]`;
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
