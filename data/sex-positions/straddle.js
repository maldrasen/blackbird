// First straddling second's waist. Second lying face down. Standard massage
// position. Penetration is possible, but a handjob is not.
SexPosition.register('straddle',{
  name: 'Straddle',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.mouth],
      cock: [CockAlignment.fucked],
    },
    second: {
      ass: [AssAlignment.fucked],
    },
  },

  moves:[
    { code:'centipede', generator:moveCentipede },
    { code:'cowgirl', generator:moveCowgirl, swap:true },
    { code:'doggy-style', generator:moveDoggyStyle },
    { code:'missionary-reverse', generator:moveMissionary },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    return `[Rearrange to straddle with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer()) {
    return `[Rearrange to straddle with player on bottom with partner attitude ${context.attitude}]`;
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

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} rolls onto {B:his} back, smiling up at you while parting {B:his} thighs invitingly.`)
    options.push(`You gently roll {B:name} onto {B:his} back. {B:He} lets out a soft moan as {B:he} spreads {B:his} 
      legs open wide for you.`);
    options.push(`{B:name} turns over underneath you, {B:his} eyes full of warmth as {B:he} wraps {B:his} legs around
      your waist, pulling you tightly against {B:him}.`)
    options.push(`{B:name} slowly tuns beneath you, {B:his} affectionate hands caressing your back as you settle 
      between {B:his} spread legs.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} eagerly flips onto their back with obvious need, spreading {B:his} legs wide while 
      grinding against you.`);
    options.push(`With an excited moan, {B:name} rolls face up, wrapping {B:his} legs tightly around you while 
      pulling you close.`);
    options.push(`{B:name} bucks {B:his} hips as {B:he} turns over under you. With a deft maneuver {B:he} spreads 
      {B:his} legs wide, wrapping them around you, inviting you inward.`);

    if (b.hasNormalPussy()) {
      options.push(`{B:name} writhes lustfully beneath you, spreading {B:his} legs wide and arching upward, 
        presenting their soaked cunt for you to use however you like.`);
    }
    if (b.hasNormalCock()) {
      options.push(`{B:name} writhes lustfully beneath you, spreading {B:his} legs wide and arching upward, 
        presenting {B:his} {B:cock.thickCock} for you to use however you like.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} turns face up beneath you, spreading {B:his} legs obediently.`);
    options.push(`{B:name} shifts onto {B:his} back, allowing you to settle between {B:his} legs.`);
    options.push(`{B:name} slowly rolls onto {B:his} back, {B:his} legs parting just enough for you to push 
      between them.`);
    options.push(`Accepting the change of position without protest, {B:name} slowly turns over, parting {B:his} 
      legs for you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} quickly turns face up beneath you, parting {B:his} legs submissively.`);
    options.push(`Reaching down, you take hold of {B:name's} shoulder, turning {B:him} over underneath you as you
      push between {B:his} legs.`);
    options.push(`With {B:his} fearful eyes averted, {B:name} allows you to turn them over, {B:his} body tense yet 
      compliant as you push yourself between {B:his} spread thighs.`);

    if (b.hasNormalPussy()) {
      options.push(`Fearful but obedient, {B:name} rolls over without resistance. With your hands on {B:his} knees 
        you spread {B:his} legs wide to expose {B:his} quivering snatch to your gaze.`);
    }
    if (b.hasNormalCock()) {
      options.push(`Fearful but obedient, {B:name} rolls over without resistance. With your hands on {B:his} knees 
        you spread {B:his} legs wide to expose {B:his} throbbing cock to your gaze.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`Grabbing onto {B:name's} legs, you forcefully turn {B:him} over underneath you.`);
    options.push(`{B:name} lets out an unhappy groan as you roll {B:him} onto {B:his} back. {B:He} tries to keep 
      {B:his} thighs closed but fails as your strong hands spread {B:him} wide open.`);
    options.push(`Still trying to resist you, {B:name} struggles as you turn them face up, {B:his} body stiff as you
      push between {B:his} legs.`);
    options.push(`{B:name} lets out an unhappy huff as {B:he} turns over under you, shaking {B:his} head as you 
      spread {B:his} legs wide open beneath you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`Angrily fighting back, {B:name} thrashes as you roll {B:him} over underneath you, {B:his} legs 
      kicking wildly but uselessly as you spread them apart.`);
    options.push(`{B:name} bucks beneath as you roll them over, forcing their thighs apart despite {B:his} efforts to
      stop you.`);
    options.push(`{B:name's} body writhes in anger as you turn them over underneath you, but {B:he} can't stop you as 
      you pull {B:his} legs wide open.`);
    options.push(`{B:name} kicks and twists as you turn them over, but {B:he} can't stop you from pushing your body
      between {B:his} wide spread legs.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} smiles down at you as you roll over onto your back.`);
    options.push(`You slowly turn face up, gazing up into {A:name's} smiling face as {A:he} shifts above you.`);
    options.push(`{A:name} arches {A:his} back as {A:he} lifts up slightly, letting you roll over underneath {A:him} 
      before lowering {A:his} body back down on top of you.`);

    if (a.hasNormalCock()) {
      options.push(`You feel {A:name's} cock dangling over your legs as you turn over underneath {A:him}.`)
    }
    if (a.hasBreasts()) {
      options.push(`You can feel {A:name's} hard nipples brushing over your skin as you turn over underneath {A:him}.`)
    }
    if (a.hasBreasts() && a.breastsAreAtLeast('big')) {
      options.push(`{A:name} smiles warmly, {A:his} {A:breasts.bigBreasts} dangling heavily above as you turn face up 
        underneath {A:him}.`)
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    if (a.hasBreasts()) {
      options.push(`{A:name} moans, leaning down to let {A:his} nipples glide over your skin as you turn over
        underneath {A:him}.`);
    }
    if (b.hasNormalCock()) {
      options.push(`{A:name} smiles and licks {A:his} lips as {A:he} watches you turn over, your {B:cock.sixInch} 
        long {cock} slapping heavily against your thigh.`);
    }
    if (a.hasNormalPussy() && b.hasNormalCock()) {
      options.push(`{A:name} moans, rubbing {A:his} {pussy} firmly over your {cock} as you position yourself 
        underneath {A:him}.`);
    }
    if (a.hasNormalCock() && b.hasNormalCock()) {
      options.push(`{A:name} grins as you turn over underneath {A:him}, your cocks slapping together as {A:he} lowers
        {A:his} body onto yours.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} watches as you turn over onto your back underneath {A:him}.`);
    options.push(`{A:name} raises {A:his} hips slightly, letting you roll over underneath {A:him}.`);
    options.push(`{A:name} nods as you roll beneath {A:him}, positioning {A:him}self between your spread legs.`);
    options.push(`{A:name} wiggles {A:his} hips, letting you turn over underneath {A:him} before leaning down against
      your chest.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} gasps slightly as you start to turn over underneath {A:him}.`);
    options.push(`You feel {A:name} shudder slightly and turn away as you roll over underneath {A:him}, afraid of 
      what's to come.`);

    if (b.hasNormalCock() === false) {
      options.push(`{A:name's} eyes widen as you start to turn over underneath {A:him}, wrapping your legs around 
        {A:his} waist to pull {A:him} in towards you.`);
    }
    if (b.hasNormalCock()) {
      options.push(`{A:name's} eyes widen as you turn over underneath {A:him}, your {B:cock.sixInch} long cock 
        raising up underneath {A:him}.`)
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} frowns as {A:he} watches you turn over underneath {A:him}.`);
    options.push(`{A:name} huffs and turns away as you turn over underneath {A:him}, feeling more exposed now that 
      you're facing {A:him}.`);

    if (b.hasNormalCock()) {
      options.push(`{A:name} frowns as {A:he} feels your {B:cock.bigCock} sliding across {A:his} thigh as you turn 
        over underneath him.`);
    }
    if (a.hasBreasts()) {
      options.push(`{A:name} tries to back away as you turn over underneath {A:him}, but can't stop your flesh from
        brushing against {A:his} hard {A:breasts.inchLongNipples}.`);
    }
    if (a.hasNormalCock()) {
      options.push(`{A:name} winces as {A:his} cock brushes against your legs as you turn over underneath {A:him}`);
    }
  }

  // Being on bottom while partner is fighting back is an odd situation to be
  // in, though I suppose it can happen.
  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`You grab onto {A:name's} wrists as you turn over, keeping {A:him} on top of you.`);
  }

  return Random.from(options);
}
