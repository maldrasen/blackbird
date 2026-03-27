// First standing behind second, crotch pressed against ass. Second has back
// turned to first.
SexPosition.register('standing-reversed',{
  name: 'Reverse Standing',

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
    { code:'centipede', generator:moveCentipede },
    { code:'kneeling-service', generator:moveKneeling, swap:true },
    { code:'lap-sitting-reversed', generator:moveLapSitting },
    { code:'spooning', generator:moveSpooning },
    { code:'standing', generator:moveStanding },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to standing reversed with player behind partner with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to standing reversed with player in front of partner with partner attitude ${context.attitude}]`;
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

function moveKneeling(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to kneeling with player still standing with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to kneeling with player kneeling with partner attitude ${context.attitude}]`;
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

function moveStanding(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to standing (partner turns around) with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to standing (player turns around) with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}
