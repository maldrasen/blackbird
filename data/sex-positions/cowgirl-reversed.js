// First on bottom, laying down. Second straddling their waist facing first's feet.
SexPosition.register('cowgirl-reversed',{
  name: 'Reverse Cowgirl',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves:[
    { code:'cowgirl', generator:moveCowgirl },
    { code:'face-sitting-reversed', generator:moveFaceSitting, swap:true },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to reverse cowgirl with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to reverse cowgirl with player on top with partner attitude ${context.attitude}]`;
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
