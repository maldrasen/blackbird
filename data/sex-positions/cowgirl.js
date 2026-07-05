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

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} settles down onto your lap with a warm smile, straddling your hips and gazing into your eyes.`);
    options.push(`With obvious affection, {B:name} climbs astride you, {B:his} hands resting gently on your chest as {B:he} settles down.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} settles astride you, {B:his} {B:cock.thickCock} resting warmly against your stomach.`);
    }
    if (b.hasBreasts() && b.areBreastsExposed()) {
      options.push(`{B:name} straddles your hips, {B:his} {B:breasts.softBreasts} swaying gently as {B:he} leans over you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} climbs eagerly astride you, grinding {B:his} hips down with a hungry grin.`);
    options.push(`With a needy moan, {B:name} straddles your hips, already rocking against you.`);
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`{B:name} straddles you, {B:his} hard {B:cock.bigCock} bobbing eagerly as {B:he} settles down.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} straddles you, {B:his} soaked {pussy} grinding eagerly against you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} climbs astride you without complaint, settling down onto your hips.`);
    options.push(`Without protest, {B:name} straddles your hips and settles into place.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} straddles your hips, {B:his} {B:cock.thickCock} resting against your stomach.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} climbs astride you nervously, {B:his} hands trembling as {B:he} settles onto your hips.`);
    options.push(`With a shaky breath, {B:name} straddles you, unsure what to expect.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously settles astride you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as {B:he} climbs astride you, reluctantly settling onto your hips.`);
    options.push(`With a huff, {B:name} straddles you, clearly unhappy about it.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} shifts reluctantly as {B:he} settles astride you, {B:his} {B:cock.thickCock} swaying 
        invitingly.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you pull {B:him} down astride you, forcing {B:him} to straddle your hips.`);
    options.push(`{B:name} struggles, but you drag {B:him} down onto your lap anyway.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.thickCock} swings as {B:he} thrashes astride you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You settle down onto {A:name's} lap, straddling {A:his} hips as {A:he} gazes up at you with a warm smile.`);
    options.push(`{A:name} smiles warmly up at you as you climb astride {A:him}, {A:his} hands resting gently on your hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} smiles up at you, {A:his} {A:cock.thickCock} resting warmly against your stomach as you settle astride {A:him}.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:name} smiles up at you, {A:his} {A:breasts.softBreasts} rising and falling gently as you settle astride {A:him}.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} grins hungrily up at you as you climb astride {A:him}, grinding your hips down.`);
    options.push(`{A:name} moans as you straddle {A:him}, already rocking against {A:him}.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{A:his} hard {A:cock.bigCock} bobs eagerly as you settle astride {A:him}.`);
    }
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`{A:his} soaked {pussy} glistens with need as you settle astride {A:him} and grind against it.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You climb astride {A:name} without complaint, settling down onto {A:his} hips.`);
    options.push(`Without protest, you straddle {A:name} and settle into place.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} rests against your stomach as you settle astride {A:him}.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} lies nervously beneath you, {A:his} hands trembling as you settle onto {A:his} hips.`);
    options.push(`With a shaky breath, {A:name} watches you settle astride {A:him}, unsure what to expect.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.sixInch} long {cock} trembles as {A:he} nervously lies beneath you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles as you climb astride {A:him}, clearly reluctant.`);
    options.push(`With a huff, {A:name} lies beneath you, unhappy about the whole thing.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} shifts reluctantly beneath you, {A:his} {A:cock.thickCock} pressed against your stomach as you settle astride {A:him}.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you climb astride {A:him} anyway, forcing yourself down onto {A:his} hips.`);
    options.push(`{A:name} struggles, but you settle astride {A:him} regardless.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} swings as {A:he} thrashes beneath you.`);
    }
  }

  return Random.from(options);
}

function moveCowgirl(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} smiles and turns around atop you, still straddling your hips but now facing your feet.`);
    options.push(`With a playful grin, {B:name} spins around, keeping {B:his} hips settled on yours as {B:he} faces away.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} turns around, {B:his} {B:cock.thickCock} brushing against your leg as {B:he} settles back down facing away.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} eagerly spins around atop you, grinding {B:his} hips down as {B:he} turns to face your feet.`);
    options.push(`With a needy moan, {B:name} turns around, presenting {B:his} ass as {B:he} settles back onto you.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} turns around, {B:his} soaked {pussy} on display as {B:he} settles back down facing your feet.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} turns around without complaint, settling back down facing your feet.`);
    options.push(`Without protest, {B:name} spins around atop you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} turns around nervously, unsure why you want {B:him} facing away.`);
    options.push(`With a shaky breath, {B:name} spins around atop you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as {B:he} turns around, reluctantly facing away from you.`);
    options.push(`With a huff, {B:name} spins around atop you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you turn {B:him} around, forcing {B:him} to face away from you.`);
    options.push(`{B:name} struggles, but you spin {B:him} around anyway.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} smiles as you turn around atop {A:him}, still straddling {A:his} hips but now facing {A:his} feet.`);
    options.push(`{A:name} grins playfully as you spin around, keeping your hips settled on {A:his} as you turn to face away.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You turn around, {A:his} {A:cock.thickCock} brushing against your leg as you settle back down facing away.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} groans eagerly as you spin around atop {A:him}, grinding your hips down as you turn to face {A:his} feet.`);
    options.push(`{A:name} moans as you turn around, presenting your ass as you settle back down onto {A:him}.`);
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`You turn around, {A:his} soaked {pussy} brushing your ass as you settle back down facing {A:his} feet.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You turn around without complaint, settling back down facing {A:his} feet.`);
    options.push(`Without protest, you spin around atop {A:name}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} watches nervously as you turn around atop {A:him}.`);
    options.push(`With a shaky breath, {A:name} lies still as you spin around atop {A:him}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles as you turn around atop {A:him}, clearly reluctant.`);
    options.push(`With a huff, {A:name} lies beneath you as you spin around.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you turn around atop {A:him} anyway.`);
    options.push(`{A:name} struggles, but you spin around regardless.`);
  }

  return Random.from(options);
}

function moveFaceSitting(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You scoot forward, settling your hips over {B:name's} face as {B:he} tilts {B:his} head back with a warm smile, welcoming you.`);
    options.push(`With obvious affection, {B:name} turns {B:his} face up eagerly as you shift forward to sit astride {B:his} face.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You settle down, your {A:cock.thickCock} resting against {B:his} chest as you sit astride {B:his} face.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} moans in anticipation as you scoot forward, settling your hips over {B:his} face.`);
    options.push(`Eager for a taste, {B:name} tilts {B:his} head back as you shift forward to sit on {B:his} face.`);
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`You settle down, your soaked {pussy} hovering over {B:his} eagerly waiting mouth.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You scoot forward, settling over {B:name's} face without complaint from {B:him}.`);
    options.push(`{B:name} tilts {B:his} head back without protest as you shift forward to sit on {B:his} face.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} tilts {B:his} head back nervously as you shift forward to sit on {B:his} face.`);
    options.push(`With a shaky breath, {B:name} lies still as you settle your hips over {B:his} face.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles, reluctantly tilting {B:his} head back as you shift forward.`);
    options.push(`With a huff, {B:name} lies still as you settle over {B:his} face.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you shift forward, forcing {B:his} head back as you settle over {B:his} face.`);
    options.push(`{B:name} struggles, but you settle your hips over {B:his} face anyway.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} shifts forward with a warm smile, settling {A:his} hips over your face as you tilt your head back to welcome {A:him}.`);
    options.push(`With obvious affection, {A:name} scoots forward to sit astride your face.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} rests against your chest as {A:name} settles down to sit astride your face.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} moans eagerly as {A:he} scoots forward, settling {A:his} hips over your face.`);
    options.push(`Hungry for it, {A:name} shifts forward to sit astride your face.`);
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`{A:name} settles down eagerly, {A:his} soaked {pussy} hovering over your waiting mouth.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} shifts forward without complaint, settling over your face.`);
    options.push(`Without protest, {A:name} scoots forward to sit on your face.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} shifts forward nervously, settling {A:his} hips over your face.`);
    options.push(`With a shaky breath, {A:name} scoots forward to sit on your face.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles as {A:he} shifts forward, reluctantly settling over your face.`);
    options.push(`With a huff, {A:name} scoots forward to sit on your face.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you grab {A:his} hips and pull {A:him} down onto your face anyway.`);
    options.push(`{A:name} struggles, but you pull {A:him} down onto your face regardless.`);
  }

  return Random.from(options);
}

function moveStraddle(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} smiles and rolls onto {B:his} stomach beneath you as you shift back to straddle {B:his} waist.`);
    options.push(`With obvious affection, {B:name} turns face-down, settling comfortably as you slide back to straddle {B:his} hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} rolls onto {B:his} stomach, {B:his} {B:cock.thickCock} trapped beneath {B:him}, as you shift back to straddle {B:his} waist.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} eagerly flips onto {B:his} stomach, arching {B:his} back as you shift back to straddle {B:his} waist.`);
    options.push(`With a needy moan, {B:name} rolls face-down beneath you as you slide back onto {B:his} hips.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} arches {B:his} back eagerly, {B:his} soaked {pussy} trapped beneath {B:him}, as you shift back to straddle {B:his} waist.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} turns onto {B:his} stomach without complaint as you shift back to straddle {B:his} waist.`);
    options.push(`Without protest, {B:name} rolls face-down beneath you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} turns over nervously as you shift back to straddle {B:his} waist.`);
    options.push(`With a shaky breath, {B:name} rolls face-down beneath you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as {B:he} reluctantly turns onto {B:his} stomach.`);
    options.push(`With a huff, {B:name} rolls face-down as you shift back to straddle {B:his} waist.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you force {B:him} onto {B:his} stomach, shifting back to straddle {B:his} waist regardless.`);
    options.push(`{B:name} struggles, but you flip {B:him} face-down and settle onto {B:his} hips anyway.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} smiles as you roll onto your stomach, shifting back to straddle your waist.`);
    options.push(`You turn face-down, settling comfortably as {A:name} slides back affectionately to straddle your hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`You roll onto your stomach, your {B:cock.thickCock} trapped beneath you, as {A:name} shifts back to straddle your waist.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} moans eagerly as you flip onto your stomach, arching your back as {A:he} shifts back to straddle your waist.`);
    options.push(`With a needy moan, you roll face-down as {A:name} slides back onto your hips.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`You arch your back, your soaked {pussy} trapped beneath you, as {A:name} shifts back eagerly to straddle your waist.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You turn onto your stomach without complaint as {A:name} shifts back to straddle your waist.`);
    options.push(`Without protest, you roll face-down beneath {A:name}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} shifts back nervously to straddle your waist as you lie face-down beneath {A:him}.`);
    options.push(`With a shaky breath, {A:name} slides back onto your hips.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles as {A:he} reluctantly shifts back to straddle your waist.`);
    options.push(`With a huff, {A:name} slides back onto your hips, clearly unhappy about it.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you pull {A:him} back down to straddle your waist anyway.`);
    options.push(`{A:name} struggles, but you guide {A:him} back onto your hips regardless.`);
  }

  return Random.from(options);
}
