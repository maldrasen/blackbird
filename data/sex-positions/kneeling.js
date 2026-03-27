// First standing in front of second. Second on knees in front of first.
SexPosition.register('kneeling',{
  name: 'Kneeling',

  alignment: {
    first: {
      hands: [HandAlignment.mouth],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.onlyPussyEaten, AssAlignment.fingered],
    },
    second: {
      breasts: [BreastAlignment.cock],
      mouth: [MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

  moves:[
    { code:'standing', generator:moveStanding },
    { code:'kneeling-service', generator:moveKneelingService },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to kneeling with player standing with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to kneeling with player on knees with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveStanding(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  // What was previous context? No way to know who stood up.

  if (a.isPlayer()) {
    return `[Shift to standing with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to standing with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveKneelingService(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Shift to kneeling service with player standing with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Shift to kneeling service with player kneeling with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);

}
