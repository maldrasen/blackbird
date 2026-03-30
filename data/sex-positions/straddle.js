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

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    return `[Rearrange to straddle with player on top with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    return `[Rearrange to straddle with player on top with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    return `[Rearrange to straddle with player on top with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    return `[Rearrange to straddle with player on top with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    return `[Rearrange to straddle with player on top with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.violent) {
    return `[Rearrange to straddle with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.loving) {
    return `[Rearrange to straddle with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    return `[Rearrange to straddle with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    return `[Rearrange to straddle with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    throw new Error('Having the player straddled by the partner, lying on their stomach and being fearful seems incompatible.');
  }
  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    throw new Error('Having the player straddled by the partner, lying on their stomach and being resistant seems incompatible.');
  }
  if (b.isPlayer() && context.attitude === Attitude.violent) {
    throw new Error('Having the player straddled by the partner, lying on their stomach and being violent seems incompatible.');
  }

  return Random.from(options);
}

function moveCentipede(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    return `[Shift to centipede with player in back with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    return `[Shift to centipede with player in back with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    return `[Shift to centipede with player in back with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    return `[Shift to centipede with player in back with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    return `[Shift to centipede with player in back with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.violent) {
    return `[Shift to centipede with player in back with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.loving) {
    return `[Shift to centipede with player in front with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    return `[Shift to centipede with player in front with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    return `[Shift to centipede with player in front with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    throw new Error('Having the player bend over and being fearful seems incompatible.');
  }
  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    throw new Error('Having the player bend over and being resistant seems incompatible.');
  }
  if (b.isPlayer() && context.attitude === Attitude.violent) {
    throw new Error('Having the player bend over and being violent seems incompatible.');
  }

  return Random.from(options);
}

function moveCowgirl(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    return `[Shift to cowgirl with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    return `[Shift to cowgirl with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    return `[Shift to cowgirl with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    return `[Shift to cowgirl with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    return `[Shift to cowgirl with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (a.isPlayer() && context.attitude === Attitude.violent) {
    return `[Shift to cowgirl with player on bottom with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.loving) {
    return `[Shift to cowgirl with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    return `[Shift to cowgirl with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    return `[Shift to cowgirl with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    return `[Shift to cowgirl with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    return `[Shift to cowgirl with player on top with partner attitude ${context.attitude}]`;
  }
  if (b.isPlayer() && context.attitude === Attitude.violent) {
    return `[Shift to cowgirl with player on top with partner attitude ${context.attitude}]`;
  }

  return Random.from(options);
}

function moveDoggyStyle(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You slide back along {B:name's} back, your hands caressing {B:his} shoulders as {B:he} 
      affectionately raises {B:his} hips and bend forward, exposing {B:him}self completely before you.`);
    options.push(`{B:name} arches {B:his} back and lifts {B:his} hips as you ease backward, positioning {B:him}self 
      to be taken roughly.`);
    options.push(`You slide your weight back while {B:name} raises {B:his} hips, bending over so {B:his} rounded ass
      pushes up toward you.`);
    options.push(`{B:name} smiles at you, raising {B:his} hips while spreading {B:his} thighs and arching {B:his} 
      back, knowing how completely exposed it makes {B:him} look in front of you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} has a hungry look in {B:his} eyes as you slide back behind {B:him}. {B:He} lets out a low
      moan as {B:he} raises {B:his} ass into the air and spreads {B:his} legs slightly.`);
    options.push(`{B:name} arches {B:his} back and raises {B:his} ass upward as you slide back, {B:his} thighs 
      parting for you as you position yourself behind {B:him}.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} raises {B:his} ass as you position yourself behind {B:him}, letting your 
        {A:cock.thickCock} rest heavily between {B:his} ass cheeks.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} raises {B:his} hips as you slide back, bending over and lifting {B:his} ass into position.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} quickly lifts {B:his} hips, bending forward as you slide backward, taking position behind 
      {B:him}.`);
    options.push(`With nervous obedience, {B:name} arches {B:his} back and raises {B:his} hips submissively as you 
      slide behind {B:him}.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} exhales softly as you take hold of the back of {B:his} head, pushing {B:his} face down.
      Reluctantly, {B:he} raises {B:his} ass upward as you position yourself behind {B:him}."`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you slide back, but with a firm grip on {B:his} hips you pull {B:his} ass 
      upward as you position yourself behind {B:him}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    // options.push(`You slide back gently along your partner's body, easing into position in front as they affectionately raise their hips and bend forward, their firm, rounded ass lifting high while their smooth thighs spread wider beneath you in tender submission.`);
    // options.push(`With warm affection, your partner arches their back and lifts their curving hips as you settle in front, bending over lovingly so their plump ass cheeks part invitingly, their soft skin brushing yours with quiet warmth.`);
    // options.push(`Gently guiding the shift, you move into the front of doggy style while your partner raises their hips with loving care, their rounded ass pushing upward and their thighs opening softly to welcome the new position.`);
    // options.push(`Your partner turns their head with a soft, affectionate smile and raises their hips as you slide into place in front, their smooth back arching beautifully while their firm ass lifts high in gentle surrender.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    // options.push(`Eagerly, your partner lifts their hips with slutty hunger as you slide into the front doggy position, grinding their firm, rounded ass back toward you while their thighs spread wide and their body quivers in horny need. "Yes, get in front— I want you right there!"`);
    // options.push(`Lustfully raising their curving hips high, your partner bends over sluttily as you settle in front, pushing their plump ass cheeks up with eager wiggles, their smooth skin flushed with raw desire.`);
    // options.push(`Horny and impatient, your partner arches their back and shoves their rounded ass upward as you move into the front position, their thighs parting sluttily so their warm body presses forward in desperate lust.`);
    // options.push(`With slutty enthusiasm, your partner lifts their hips fast and bends over deep as you take the front of doggy style, grinding their firm ass against you while their body trembles with eager, dripping hunger.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    // options.push(`Your partner raises their hips with quiet willingness as you slide into the front doggy position, bending over compliantly so their rounded ass lifts steadily, their smooth thighs parting without extra effort.`);
    // options.push(`Willing but detached, your partner lifts their curving hips as you settle in front, their firm ass rising into position with passive compliance while their body remains relaxed beneath you.`);
    // options.push(`Accepting the change calmly, your partner bends forward and raises their hips as you move into the front, their plump ass cheeks parting neutrally in the new doggy stance.`);
    // options.push(`With indifferent consent, your partner arches slightly and lifts their hips while you take the front position, their smooth back staying even as their rounded ass settles into doggy without spark.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    throw new Error('Having the player bend over and being fearful seems incompatible.');
  }
  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    throw new Error('Having the player bend over and being resistant seems incompatible.');
  }
  if (b.isPlayer() && context.attitude === Attitude.violent) {
    throw new Error('Having the player bend over and being violent seems incompatible.');
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

    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} writhes lustfully beneath you, spreading {B:his} legs wide and arching upward, 
        presenting their soaked cunt for you to use however you like.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
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

    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`Fearful but obedient, {B:name} rolls over without resistance. With your hands on {B:his} knees 
        you spread {B:his} legs wide to expose {B:his} quivering snatch to your gaze.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
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

    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You feel {A:name's} cock dangling over your legs as you turn over underneath {A:him}.`)
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`You can feel {A:name's} hard nipples brushing over your skin as you turn over underneath {A:him}.`)
    }
    if (a.hasBreasts() && a.breastsAreAtLeast('big') && a.areBreastsExposed()) {
      options.push(`{A:name} smiles warmly, {A:his} {A:breasts.bigBreasts} dangling heavily above as you turn face up 
        underneath {A:him}.`)
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} smiles and licks {A:his} lips, watching as you turn over underneath {A:him}.`);

    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:name} moans, leaning down to let {A:his} nipples glide over your skin as you turn over
        underneath {A:him}.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{A:name} smiles and licks {A:his} lips as {A:he} watches you turn over, your {B:cock.sixInch} 
        long {cock} slapping heavily against your thigh.`);
    }
    if (a.hasNormalPussy() && b.hasNormalCock() && a.isCrotchExposed() && b.isCrotchExposed()) {
      options.push(`{A:name} moans, rubbing {A:his} {pussy} firmly over your {cock} as you position yourself 
        underneath {A:him}.`);
    }
    if (a.hasNormalCock() && b.hasNormalCock() && a.isCrotchExposed() && b.isCrotchExposed()) {
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
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{A:name's} eyes widen as you turn over underneath {A:him}, your {B:cock.sixInch} long cock 
        raising up underneath {A:him}.`)
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} frowns as {A:he} watches you turn over underneath {A:him}.`);
    options.push(`{A:name} huffs and turns away as you turn over underneath {A:him}, feeling more exposed now that 
      you're facing {A:him}.`);

    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{A:name} frowns as {A:he} feels your {B:cock.bigCock} sliding across {A:his} thigh as you turn 
        over underneath him.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:name} tries to back away as you turn over underneath {A:him}, but can't stop your flesh from
        brushing against {A:his} hard {A:breasts.inchLongNipples}.`);
    }
    if (a.hasNormalCock() && a.isCrotchExposed()) {
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
