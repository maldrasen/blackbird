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
    { code:'centipede', generator:moveCentipede, swap:true },
    { code:'kneeling', generator:moveKneeling },
    { code:'standing-reversed', generator:moveStanding, swap:true },
    { code:'lap-sitting-reversed', generator:moveLapSitting, swap:true },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to kneeling service with player standing with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to kneeling service with player on knees with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

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

function moveKneeling(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to kneeling with player standing with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to kneeling with player kneeling with partner attitude ${context.attitude}]`;
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
