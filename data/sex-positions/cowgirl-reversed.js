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

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} settles down onto your hips with a warm smile, facing your feet as {B:he} straddles you.`);
    options.push(`With obvious affection, {B:name} climbs astride you facing away, {B:his} hands resting gently on
      your legs.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} settles down facing away, {B:his} {B:cock.thickCock} resting warmly against your leg.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} climbs eagerly astride you facing away, grinding {B:his} ass down against you.`);
    options.push(`With a needy moan, {B:name} straddles your hips facing your feet, already rocking back against you.`);
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`{B:name} straddles you, {B:his} hard {B:cock.bigCock} bobbing as {B:he} settles down facing away.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} straddles you facing away, {B:his} soaked {pussy} grinding eagerly against your stomach.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} climbs astride you facing away without complaint.`);
    options.push(`Without protest, {B:name} straddles your hips, facing your feet.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} settles facing away, {B:his} {B:cock.thickCock} resting against your leg.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} climbs astride you nervously, facing away, {B:his} hands trembling on your legs.`);
    options.push(`With a shaky breath, {B:name} straddles you facing your feet, unsure what to expect.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously settles facing away.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles, reluctantly climbing astride you facing away.`);
    options.push(`With a huff, {B:name} straddles you facing your feet, clearly unhappy about it.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you pull {B:him} down astride you facing away, forcing {B:him} into position.`);
    options.push(`{B:name} struggles, but you drag {B:him} down onto your hips anyway, facing away from you.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You settle down onto {A:name's} hips, facing {A:his} feet as {A:he} gazes up at you with a warm smile.`);
    options.push(`{A:name} smiles warmly beneath you as you climb astride {A:him} facing away, {A:his} hands
      resting gently on your legs.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} smiles beneath you, {A:his} {A:cock.thickCock} resting warmly against your leg as
        you settle facing away.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} groans eagerly as you climb astride {A:him} facing away, grinding your ass down against
      {A:him}.`);
    options.push(`{A:name} moans as you straddle {A:him} facing away, already rocking back against {A:him}.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{A:his} hard {A:cock.bigCock} bobs as you settle astride {A:him}, facing away.`);
    }
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`{A:his} soaked {pussy} grinds eagerly against your stomach as you settle astride {A:him},
        facing away.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You climb astride {A:name} facing away without complaint.`);
    options.push(`Without protest, you straddle {A:name}, facing {A:his} feet.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} rests against your leg as you settle facing away.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} lies nervously beneath you, {A:his} hands trembling as you settle facing away.`);
    options.push(`With a shaky breath, {A:name} watches you settle astride {A:him}, unsure what to expect.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.sixInch} long {cock} trembles as {A:he} nervously lies beneath you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles as you climb astride {A:him} facing away, clearly reluctant.`);
    options.push(`With a huff, {A:name} lies beneath you, unhappy about the whole thing.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you climb astride {A:him} anyway, facing away.`);
    options.push(`{A:name} struggles, but you settle astride {A:him} regardless, facing away from {A:him}.`);
  }

  return Random.from(options);
}

function moveCowgirl(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} smiles and turns around atop you, still straddling your hips but now facing you.`);
    options.push(`With a playful grin, {B:name} spins around, keeping {B:his} hips settled on yours as {B:he} turns
      to face you.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} turns to face you, {B:his} {B:cock.thickCock} brushing against your stomach as {B:he}
        settles back down.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} eagerly spins around atop you, grinding {B:his} hips down as {B:he} turns to face
      you.`);
    options.push(`With a needy moan, {B:name} turns around, gazing hungrily down at you as {B:he} settles back
      onto you.`);
    if (b.hasBreasts() && b.areBreastsExposed()) {
      options.push(`{B:name} turns to face you, {B:his} {B:breasts.softBreasts} swaying as {B:he} leans down
        eagerly.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} turns around, {B:his} soaked {pussy} grinding against you as {B:he} settles back down
        facing you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} turns around without complaint, settling back down facing you.`);
    options.push(`Without protest, {B:name} spins around atop you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} turns around nervously, unsure why you want {B:him} facing you now.`);
    options.push(`With a shaky breath, {B:name} spins around atop you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles, reluctantly turning around to face you.`);
    options.push(`With a huff, {B:name} spins around atop you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you turn {B:him} around, forcing {B:him} to face you.`);
    options.push(`{B:name} struggles, but you spin {B:him} around anyway.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} smiles as you turn around atop {A:him}, still straddling {A:his} hips but now facing
      {A:him}.`);
    options.push(`You spin around, keeping your hips settled on {A:name's} as {A:he} grins playfully up at you.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You turn to face {A:name}, {A:his} {A:cock.thickCock} brushing against your stomach as you
        settle back down.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} groans eagerly as you spin around atop {A:him}, grinding your hips down as you turn to
      face {A:him}.`);
    options.push(`{A:name} moans hungrily as you turn around, gazing down at {A:him} as you settle back onto
      {A:him}.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{A:his} hard {A:cock.bigCock} bobs as you turn to face {A:him}.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You turn around without complaint, settling back down facing {A:name}.`);
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
    options.push(`You scoot forward, presenting your ass to {B:name's} waiting mouth as {B:he} tilts {B:his} head
      back with a warm smile.`);
    options.push(`With obvious affection, {B:name} turns {B:his} face up eagerly as you settle back to sit on
      {B:his} face, facing away.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You settle down, your {A:cock.thickCock} resting against {B:his} chest as you sit facing away
        on {B:his} face.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} moans in anticipation as you settle back, presenting your ass to {B:his} waiting
      mouth.`);
    options.push(`Eager for a taste, {B:name} tilts {B:his} head back as you sit facing away on {B:his} face.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You settle down, your {A:cock.thickCock} within easy reach of {B:his} eagerly waiting hands as
        you sit facing away.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You scoot forward, settling onto {B:name's} face without complaint from {B:him}.`);
    options.push(`{B:name} tilts {B:his} head back without protest as you sit facing away on {B:his} face.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} tilts {B:his} head back nervously as you settle facing away on {B:his} face.`);
    options.push(`With a shaky breath, {B:name} lies still as you sit down, presenting your ass to {B:his}
      mouth.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles, reluctantly tilting {B:his} head back as you settle facing away on {B:his}
      face.`);
    options.push(`With a huff, {B:name} lies still as you sit down on {B:his} face.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you settle down facing away, forcing {B:his} head back beneath you.`);
    options.push(`{B:name} struggles, but you sit on {B:his} face anyway, facing away.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} shifts forward with a warm smile, presenting {A:his} ass to your waiting mouth as you
      tilt your head back.`);
    options.push(`With obvious affection, {A:name} settles back to sit on your face, facing away.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} rests against your chest as {A:name} settles down facing away on
        your face.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} moans eagerly as {A:he} settles back, presenting {A:his} ass to your waiting mouth.`);
    options.push(`Hungry for it, {A:name} shifts forward to sit facing away on your face.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} settles down eagerly, {A:his} {A:cock.thickCock} within easy reach of your hands.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} shifts forward without complaint, settling onto your face facing away.`);
    options.push(`Without protest, {A:name} sits on your face, facing away.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} shifts forward nervously, settling facing away on your face.`);
    options.push(`With a shaky breath, {A:name} sits on your face, facing away.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles, reluctantly settling facing away on your face.`);
    options.push(`With a huff, {A:name} sits on your face, facing away.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you pull {A:his} hips down onto your face anyway, facing away.`);
    options.push(`{A:name} struggles, but you pull {A:him} down onto your face regardless.`);
  }

  return Random.from(options);
}
