// First on knees, thrusting into second from behind. Second bent over in front of first.
SexPosition.register('doggy-style',{
  name: 'Doggy Style',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves: [
    { code:'centipede', generator:moveCentipede },
    { code:'missionary-reversed', generator:moveMissionary },
    { code:'spooning', generator:moveSpooning },
    { code:'straddle', generator:moveStraddle },
  ],

  generateRearrange: rearrange
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} settles onto {B:his} knees in front of you, smiling as {B:he} bends forward and raises {B:his} hips.`);
    options.push(`With obvious affection, {B:name} bends over for you, arching {B:his} back invitingly.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} bends over affectionately, {B:his} {B:cock.thickCock} swaying between {B:his} legs.`);
    }
    if (b.hasBreasts() && b.areBreastsExposed()) {
      options.push(`{B:name} bends forward with a warm smile, {B:his} {B:breasts.softBreasts} swaying gently as {B:he} settles into position.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} drops eagerly onto {B:his} knees, bending forward and spreading {B:his} thighs for you.`);
    options.push(`With a needy moan, {B:name} bends over, presenting {B:his} ass for you.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} spreads {B:his} legs eagerly, {B:his} soaked {pussy} glistening as {B:he} bends over for you.`);
    }
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`{B:name} moans as {B:he} bends over, {B:his} hard {B:cock.bigCock} bobbing between {B:his} legs.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} bends over without complaint, settling into position in front of you.`);
    options.push(`Without protest, {B:name} kneels and bends forward for you.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} bends over, {B:his} {B:cock.thickCock} hanging plainly between {B:his} legs.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} bends over nervously, {B:his} body tense as {B:he} settles into position.`);
    options.push(`With a shaky breath, {B:name} kneels and bends forward, unsure what to expect.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously bends over for you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles, reluctantly bending over in front of you.`);
    options.push(`With a huff, {B:name} kneels and bends forward, clearly unhappy about it.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you force {B:him} into position, bending {B:him} over in front of you.`);
    options.push(`{B:name} struggles, but you push {B:him} down onto {B:his} knees and bend {B:him} over anyway.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} settles behind you with obvious affection as you bend over, arching your for {B:him}.`);
    options.push(`You settle onto your knees, bending forward as {A:name} kneels behind you with a warm smile.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} kneels behind you affectionately, {A:his} {A:cock.thickCock} resting against your ass as you bend over.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} moans with need as you bend over, presenting your ass for {A:him}.`);
    options.push(`{A:name} settles hungrily behind you as you drop onto your knees, bending forward for {A:him}.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{A:name} moans as {A:he} settles behind you, {A:his} hard {A:cock.bigCock} pressing between your cheeks.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You bend over without complaint, settling into position in front of {A:name}.`);
    options.push(`Without protest, you kneel and bend forward as {A:name} settles behind you.`);
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

// First bends over further, pushing their face into Second's ass.
function moveCentipede(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You bend over further, pushing your face affectionately into {B:name's} ass as {B:he} sighs happily.`);
    options.push(`{B:name} arches {B:his} back invitingly as you lean down, pressing your face between {B:his} cheeks.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} moans as you bend over further, pushing your face hungrily into {B:his} ass.`);
    options.push(`Eager for more, {B:name} pushes back against your face as you lean down between {B:his} cheeks.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You bend over further, pushing your face into {B:name's} ass without complaint from {B:him}.`);
    options.push(`{B:name} stays in position without protest as you lean down to press your face between {B:his} cheeks.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} tenses nervously as you bend over further, pushing your face into {B:his} ass.`);
    options.push(`With a shaky breath, {B:name} stays in position as you lean down between {B:his} cheeks.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles, reluctantly staying in position as you bend over further and push your face into {B:his} ass.`);
    options.push(`With a huff, {B:name} stays put as you lean down between {B:his} cheeks.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you bend over further, forcing your face into {B:his} ass despite {B:his} struggling.`);
    options.push(`{B:name} tries to pull away, but you push your face into {B:his} ass anyway.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You feel {A:name} bending down behind you affectionately, pushing {A:his} face into your ass.`);
    options.push(`{A:name} sighs happily as {A:he} leans down, pressing {A:his} face between your cheeks.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You feel {A:name} bending down hungrily behind you, pushing {A:his} face into your ass.`);
    options.push(`{A:name} moans as {A:he} leans down, pressing {A:his} face eagerly between your cheeks.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You feel {A:name} bending down behind you without complaint, pushing {A:his} face into your ass.`);
    options.push(`{A:name} leans down without protest, pressing {A:his} face between your cheeks.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`You feel {A:name} bending down nervously behind you, pushing {A:his} face into your ass.`);
    options.push(`With a shaky breath, {A:name} leans down, pressing {A:his} face between your cheeks.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`You feel {A:name} bending down behind you, grumbling reluctantly as {A:he} pushes {A:his} face into your ass.`);
    options.push(`With a huff, {A:name} leans down, clearly unhappy about it.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you push {A:his} face down into your ass, {A:his} struggles doing nothing to stop you.`);
    options.push(`{A:name} tries to pull away, but you force {A:his} face into your ass anyway.`);
  }

  return Random.from(options);
}

function moveMissionary(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} lowers {B:him}self flat onto {B:his} stomach with a contented sigh as you settle on top of {B:him}.`);
    options.push(`With obvious affection, {B:name} stretches out beneath you, letting you cover {B:his} body with your own.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} lowers {B:him}self flat as you settle on top, your {A:cock.thickCock} resting warmly against {B:his} lower back.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} moans and lowers {B:him}self flat, arching {B:his} hips up as you settle on top of {B:him}.`);
    options.push(`Eager for more, {B:name} spreads out beneath you, pressing back against you as you lower yourself onto {B:his} back.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{B:name} moans as you settle on top, your hard {A:cock.bigCock} pressing eagerly against {B:his} lower back.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} lowers {B:him}self flat onto {B:his} stomach without complaint, letting you settle on top of {B:him}.`);
    options.push(`Without protest, {B:name} stretches out beneath you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} lowers {B:him}self flat nervously, {B:his} body tense as you settle on top of {B:him}.`);
    options.push(`With a shaky breath, {B:name} lies down beneath you.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.sixInch} long {cock} trembles nervously as you settle on top of {B:him}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles, reluctantly lowering {B:him}self flat as you settle on top of {B:him}.`);
    options.push(`With a huff, {B:name} lies down beneath you, clearly unhappy about it.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you force {B:him} down flat, pinning {B:him} beneath your weight.`);
    options.push(`{B:name} struggles, but you push {B:him} down onto {B:his} stomach and settle on top anyway.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You lower yourself flat with a contented sigh as {A:name} settles warmly on top of you.`);
    options.push(`{A:name} covers your body with {A:his} own affectionately as you stretch out beneath {A:him}.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} settles on top of you, {A:his} {A:cock.thickCock} resting warmly against your lower back.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You moan and lower yourself flat, arching your hips up as {A:name} settles eagerly on top of you.`);
    options.push(`{A:name} presses down against you hungrily as you spread out beneath {A:him}.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`You moan as {A:name} settles on top, {A:his} hard {A:cock.bigCock} pressing eagerly against your lower back.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You lower yourself flat without complaint, letting {A:name} settle on top of you.`);
    options.push(`Without protest, you stretch out beneath {A:name}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} settles on top of you nervously, {A:his} body tense.`);
    options.push(`With a shaky breath, {A:name} lies down flat on top of you.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.sixInch} long {cock} trembles nervously as {A:he} settles on top of you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles, reluctantly lowering {A:him}self on top of you.`);
    options.push(`With a huff, {A:name} lies down on top of you, clearly unhappy about it.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you pull {A:him} down on top of you anyway, {A:his} struggles doing nothing to stop you.`);
    options.push(`{A:name} struggles, but you keep pulling {A:him} down on top of you regardless.`);
  }

  return Random.from(options);
}

function moveSpooning(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} lowers {B:him}self onto {B:his} side with a contented sigh as you settle in behind {B:him}.`);
    options.push(`With obvious affection, {B:name} nestles back against you as you both settle onto your sides.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} settles onto {B:his} side, {B:his} {B:cock.thickCock} resting against {B:his} leg as you spoon up behind {B:him}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} moans and lowers {B:him}self onto {B:his} side, pressing back against you eagerly.`);
    options.push(`Eager for more, {B:name} settles onto {B:his} side, grinding {B:his} hips back against you.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} settles onto {B:his} side, {B:his} soaked {pussy} glistening as {B:he} presses back against you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} lowers {B:him}self onto {B:his} side without complaint as you settle in behind {B:him}.`);
    options.push(`Without protest, {B:name} settles onto {B:his} side.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} lowers {B:him}self onto {B:his} side nervously as you settle in behind {B:him}.`);
    options.push(`With a shaky breath, {B:name} settles onto {B:his} side.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles, reluctantly settling onto {B:his} side as you settle in behind {B:him}.`);
    options.push(`With a huff, {B:name} lies onto {B:his} side, clearly unhappy about it.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you pull {B:him} onto {B:his} side, settling in behind {B:him} anyway.`);
    options.push(`{B:name} struggles, but you settle in behind {B:him} regardless.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You lower yourself onto your side with a contented sigh as {A:name} settles in behind you.`);
    options.push(`{A:name} nestles affectionately behind you as you both settle onto your sides.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} settles behind you, {A:his} {A:cock.thickCock} resting warmly against your leg.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You moan and lower yourself onto your side as {A:name} presses eagerly against your back.`);
    options.push(`{A:name} settles behind you hungrily, grinding {A:his} hips against your ass.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{A:name} settles behind you, {A:his} hard {A:cock.bigCock} pressing against your ass.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You lower yourself onto your side without complaint as {A:name} settles in behind you.`);
    options.push(`Without protest, you settle onto your side.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} settles in behind you nervously as you lie on your side.`);
    options.push(`With a shaky breath, {A:name} nestles in behind you.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles, reluctantly settling in behind you.`);
    options.push(`With a huff, {A:name} lies down behind you, clearly unhappy about it.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you reach back and pull {A:him} against you anyway.`);
    options.push(`{A:name} struggles, but you pull {A:him} in behind you regardless.`);
  }

  return Random.from(options);
}

function moveStraddle(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You climb up onto {B:name's} back, straddling {B:his} waist as {B:he} settles down flat with a contented sigh.`);
    options.push(`{B:name} lowers {B:him}self onto {B:his} stomach affectionately as you rise up and swing a leg over {B:his} hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You climb up onto {B:name's} back, your {A:cock.thickCock} resting warmly along {B:his} spine as {B:he} settles down flat beneath you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} moans as {B:he} lowers {B:him}self flat, arching {B:his} back as you climb up to straddle {B:his} waist.`);
    options.push(`Eager for more, {B:name} spreads out beneath you as you rise up and settle astride {B:his} hips.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{B:name} moans as you climb up, your hard {A:cock.bigCock} dragging along {B:his} back as you settle astride {B:his} hips.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} lowers {B:him}self flat onto {B:his} stomach without complaint as you climb up to straddle {B:his} waist.`);
    options.push(`Without protest, {B:name} stretches out beneath you as you settle astride {B:his} hips.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} lowers {B:him}self flat nervously as you climb up to straddle {B:his} waist.`);
    options.push(`With a shaky breath, {B:name} lies down flat as you settle astride {B:his} hips.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles, reluctantly lowering {B:him}self flat as you climb up to straddle {B:his} waist.`);
    options.push(`With a huff, {B:name} lies down as you settle astride {B:his} hips.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you force {B:him} down flat, climbing up to straddle {B:his} waist regardless.`);
    options.push(`{B:name} struggles, but you push {B:him} down and settle astride {B:his} hips anyway.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You lower yourself flat with a contented sigh as {A:name} climbs up to straddle your waist.`);
    options.push(`{A:name} rises up affectionately, swinging a leg over your hips as you settle down flat beneath {A:him}.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} climbs up onto your back, {A:his} {A:cock.thickCock} resting warmly along your spine as you settle down flat beneath {A:him}.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You moan and lower yourself flat, arching your back as {A:name} climbs up to straddle your waist.`);
    options.push(`{A:name} rises up eagerly, settling astride your hips as you spread out beneath {A:him}.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`You moan as {A:name} climbs up, {A:his} hard {A:cock.bigCock} dragging along your back as {A:he} settles astride your hips.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You lower yourself flat without complaint as {A:name} climbs up to straddle your waist.`);
    options.push(`Without protest, you stretch out beneath {A:name} as {A:he} settles astride your hips.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} climbs up nervously to straddle your waist as you lie flat beneath {A:him}.`);
    options.push(`With a shaky breath, {A:name} settles astride your hips.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles, reluctantly climbing up to straddle your waist.`);
    options.push(`With a huff, {A:name} settles astride your hips, unhappy about the whole thing.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you pull {A:him} up to straddle you anyway, {A:his} struggles doing nothing to stop you.`);
    options.push(`{A:name} struggles, but you keep pulling {A:him} onto your hips regardless.`);
  }

  return Random.from(options);
}
