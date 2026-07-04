// First lying on top of Second. Second lying face up, legs spread.
SexPosition.register('missionary',{
  name: 'Missionary',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
      ass: [AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  // We can move from standing to missionary, but not back to standing.
  moves:[
    { code:'lap-sitting', generator:moveLapSitting, swap:true },
    { code:'missionary-reversed', generator:moveMissionary },
    { code:'prone', generator:moveProne, swap:true },
    { code:'sixty-nine', generator:moveSixtyNine },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} lies back with a warm smile, spreading {B:his} legs invitingly as you settle between
      them.`);
    options.push(`{B:name} pulls you down close, wrapping {B:his} legs around your waist as you settle on top,
      {B:his} eyes full of warmth.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} lies back, spreading {B:his} legs to reveal {B:his} wet {pussy}, gazing up at you
        fondly as you settle between {B:his} thighs.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} lies back, {B:his} {B:cock.thickCock} resting against {B:his} stomach, as you settle
        warmly between {B:his} spread legs.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} flops eagerly onto {B:his} back, spreading {B:his} legs wide with obvious need as you
      settle on top.`);
    options.push(`With a needy moan, {B:name} lies back and hooks {B:his} legs around you, pulling you down between
      {B:his} thighs.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} lies back, spreading {B:his} soaked {pussy} open as {B:he} arches up toward you
        eagerly.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} lies back, {B:his} {B:cock.bigCock} already hard against {B:his} stomach, spreading
        {B:his} legs wide for you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} lies back and spreads {B:his} legs, letting you settle between them.`);
    options.push(`Without complaint, {B:name} settles onto {B:his} back, {B:his} legs parting for you.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} lies back, legs parting to reveal {B:his} {pussy}, as you settle between {B:his}
        thighs.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} lies back, {B:his} {B:cock.thickCock} lying against {B:his} stomach, as you settle
        between {B:his} legs.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} lies back with a nervous breath, parting {B:his} legs submissively as you settle between
      them.`);
    options.push(`Trembling slightly, {B:name} lowers {B:him}self onto {B:his} back, spreading {B:his} legs as you
      settle on top.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name's} hands tremble as {B:he} lies back, spreading {B:his} legs to expose {B:his} {pussy},
        eyes averted from yours.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} lies back reluctantly, {B:his} legs parting slowly under your insistent hands.`);
    options.push(`With a huff, {B:name} settles onto {B:his} back, grudgingly spreading {B:his} legs as you press
      between them.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you force {B:him} onto {B:his} back, pinning {B:him} down as you pry {B:his}
      legs apart.`);
    options.push(`{B:name} struggles beneath you, kicking uselessly as you force {B:him} onto {B:his} back and
      spread {B:his} legs.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You lie back as {A:name} smiles warmly, settling between your legs.`);
    options.push(`{A:name} gently guides you onto your back, {A:his} eyes full of warmth as {A:he} settles between
      your spread legs.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You lie back, spreading your legs as {A:name} settles between them, {A:his} {A:cock.thickCock}
        resting warmly against you.`);
    }
    if (a.hasBreasts() && a.breastsAreAtLeast('big') && a.areBreastsExposed()) {
      options.push(`{A:his} {A:breasts.bigSoftBreasts} sway forward as {A:name} leans down warmly, settling between
        your spread legs.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You lie back as {A:name} licks {A:his} lips hungrily, quickly settling between your spread legs.`);
    options.push(`{A:name} groans with want, urging you onto your back before settling eagerly between your
      thighs.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You lie back, spreading your legs as {A:name} settles between them, {A:his} {A:cock.bigCock}
        already hard.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:name}'s {A:breasts.softBreasts} sway as {A:he} settles eagerly between your spread legs.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You lie back and spread your legs, letting {A:name} settle between them.`);
    options.push(`{A:name} settles between your legs without comment as you lie back for {A:him}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`You lie back with a nervous breath as {A:name} settles between your legs.`);
    options.push(`{A:name}'s expression softens slightly as you tremble, lying back and parting your legs for
      {A:him}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`You lie back reluctantly as {A:name} pries your legs apart, settling between them.`);
    options.push(`{A:name} huffs impatiently, pushing your legs apart as you grudgingly lie back for {A:him}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} forces you onto your back, pinning you down as {A:he} pries your legs apart.`);
    options.push(`You thrash as {A:name} shoves you onto your back, but {A:he} pries your legs apart and settles
      between them anyway.`);
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
