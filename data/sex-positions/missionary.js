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
    if (b.isFullyErect() && b.isCrotchExposed()) {
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
    if (a.isFullyErect() && a.isCrotchExposed()) {
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

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You sit up as {B:name} shifts forward with a warm smile, settling onto your lap and wrapping
      {B:his} arms around your neck.`);
    options.push(`{B:name} slides into your lap affectionately, {B:his} eyes soft as {B:he} settles down facing
      you.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} settles onto your lap, {B:his} {B:cock.thickCock} pressing warmly against your stomach
        as {B:he} wraps {B:his} arms around you.`);
    }
    if (b.hasBreasts() && b.areBreastsExposed()) {
      options.push(`{B:name} slides into your lap, {B:his} {B:breasts.softBreasts} pressing gently against your
        chest as {B:he} smiles down at you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You sit up as {B:name} eagerly climbs into your lap, grinding {B:his} hips against you with a
      needy moan.`);
    options.push(`{B:name} wastes no time straddling your lap, {B:his} hungry eyes locked on yours as {B:he} settles
      down.`);
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`{B:name} settles onto your lap, {B:his} {B:cock.bigCock} already hard and trapped between your
        bodies.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} grinds {B:his} soaked {pussy} against you as {B:he} settles eagerly into your lap.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You sit up as {B:name} climbs into your lap without complaint, settling facing you.`);
    options.push(`{B:name} shifts forward and settles onto your lap, wrapping {B:his} legs around you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`You sit up as {B:name} climbs nervously into your lap, {B:his} hands trembling on your
      shoulders.`);
    options.push(`{B:name} settles onto your lap hesitantly, avoiding your eyes as {B:he} wraps {B:his} arms loosely
      around you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} climbs reluctantly into your lap, jaw tight as {B:he} settles facing you.`);
    options.push(`With a huff, {B:name} shifts onto your lap, {B:his} body stiff against you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you pull {B:him} onto your lap, forcing {B:him} to face you despite {B:his}
      struggling.`);
    options.push(`{B:name} fights to pull away, but you drag {B:him} down onto your lap anyway.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} sits up with a warm smile as you shift forward to settle onto {A:his} lap, wrapping your
      arms around {A:his} neck.`);
    options.push(`You settle into {A:name's} lap as {A:he} sits up, {A:his} eyes soft with affection.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} sits up, {A:his} {A:cock.thickCock} pressing warmly against you as you settle onto
        {A:his} lap.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:name} sits up, {A:his} {A:breasts.softBreasts} pressing against your chest as you settle
        into {A:his} lap.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} sits up eagerly as you climb into {A:his} lap, grinding your hips against {A:him} with a
      needy moan.`);
    options.push(`{A:name} pulls you into {A:his} lap hungrily, {A:his} eyes locked on yours as you settle down.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{A:name} sits up, {A:his} {A:cock.bigCock} already hard and trapped between you as you settle
        onto {A:his} lap.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} sits up without complaint as you settle onto {A:his} lap.`);
    options.push(`You climb into {A:name's} lap as {A:he} shifts to sit up, wrapping your legs around {A:him}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} sits up nervously, {A:his} hands trembling as you settle onto {A:his} lap.`);
    options.push(`{A:name} avoids your eyes as {A:he} sits up hesitantly, letting you settle onto {A:his} lap.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} sits up reluctantly, jaw tight as you settle onto {A:his} lap.`);
    options.push(`With a huff, {A:name} shifts to sit up, {A:his} body stiff as you settle onto {A:him}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you pull {A:him} up to sit, forcing {A:him} to face you as you settle onto
      {A:his} lap.`);
    options.push(`{A:name} fights to twist away, but you force {A:him} to sit up as you settle onto {A:his} lap.`);
  }

  return Random.from(options);
}

function moveMissionary(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} smiles and turns onto {B:his} stomach beneath you, arching {B:his} back invitingly.`);
    options.push(`With an affectionate nuzzle, {B:name} rolls face-down under you, letting you settle over {B:his}
      back.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} turns onto {B:his} stomach, {B:his} {B:cock.thickCock} trapped beneath {B:him}, as you
        settle warmly over {B:his} back.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} eagerly flips onto {B:his} stomach, grinding {B:his} hips into the sheets as you settle
      over {B:his} back.`);
    options.push(`With a needy moan, {B:name} turns face-down beneath you, arching {B:his} ass up against you.`);
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`{B:name} turns over, {B:his} {B:cock.bigCock} throbbing and trapped beneath {B:him}, as you
        settle onto {B:his} back.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} turns onto {B:his} stomach without complaint, letting you settle over {B:his} back.`);
    options.push(`Without protest, {B:name} rolls face-down beneath you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} turns over nervously, {B:his} body tense as you settle over {B:his} back.`);
    options.push(`With a shaky breath, {B:name} rolls face-down beneath you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as {B:he} reluctantly turns onto {B:his} stomach beneath you.`);
    options.push(`With a huff, {B:name} rolls face-down, {B:his} body stiff under you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you flip {B:him} onto {B:his} stomach, pinning {B:him} down as you settle
      over {B:his} back.`);
    options.push(`{B:name} struggles as you force {B:him} face-down beneath you.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You turn onto your stomach as {A:name} smiles warmly, settling over your back.`);
    options.push(`{A:name} nuzzles your neck affectionately as you roll face-down beneath {A:him}.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You turn over, feeling {A:name's} {A:cock.thickCock} pressing warmly against your lower back as
        {A:he} settles over you.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:his} {A:breasts.softBreasts} press against your back as {A:name} settles warmly over you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You eagerly flip onto your stomach as {A:name} settles hungrily over your back.`);
    options.push(`{A:name} groans with want as you turn face-down beneath {A:him}.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`You turn over, {A:name's} {A:cock.bigCock} already hard against your lower back as {A:he}
        settles over you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You turn onto your stomach without complaint as {A:name} settles over your back.`);
    options.push(`{A:name} settles over your back as you roll face-down for {A:him}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`You turn over nervously, your body tense as {A:name} settles over your back.`);
    options.push(`With a shaky breath, you roll face-down beneath {A:name}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`You grumble as you reluctantly turn onto your stomach beneath {A:name}.`);
    options.push(`With a huff, you roll face-down, your body stiff under {A:him}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`You thrash as {A:name} flips you onto your stomach, pinning you down as {A:he} settles over your
      back.`);
    options.push(`You struggle as {A:name} forces you face-down beneath {A:him}.`);
  }

  return Random.from(options);
}

function moveProne(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} places a lingering kiss on your stomach before sliding down between your legs, settling
      in to worship you with {B:his} mouth.`);
    options.push(`With a tender smile, {B:name} shifts downward, draping {B:him}self across your legs and lowering
      {B:his} head between your thighs.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} slides down affectionately, settling between your legs and pressing a soft kiss to
        your {A:cock.thickCock}.`);
    }
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`{B:name} slides down affectionately, settling between your legs and pressing a soft kiss to
        your {pussy}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} licks {B:his} lips hungrily as {B:he} slides down your body, settling eagerly between
      your legs.`);
    options.push(`With a needy moan, {B:name} shifts downward, {B:his} mouth already watering as {B:he} settles
      between your thighs.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} wastes no time sliding down to settle between your legs, already lapping eagerly at
        your {A:cock.bigCock}.`);
    }
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`{B:name} slides down eagerly, burying {B:his} face against your soaked {pussy} the moment {B:he}
        settles between your legs.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} shifts downward without complaint, settling between your legs.`);
    options.push(`Without protest, {B:name} slides down your body and lowers {B:his} head between your thighs.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} slides down nervously, {B:his} hands trembling as {B:he} settles between your legs.`);
    options.push(`With a shaky breath, {B:name} lowers {B:him}self between your thighs.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as {B:he} reluctantly slides down to settle between your legs.`);
    options.push(`With a huff, {B:name} shifts downward, {B:his} body stiff as {B:he} lowers {B:his} head between
      your thighs.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} struggles as you force {B:him} down between your legs.`);
    options.push(`{B:name} thrashes, but you push {B:his} head down between your thighs anyway.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You slide down {A:name's} body, pressing a lingering kiss to {A:his} stomach before settling
      between {A:his} legs. {A:He} smiles down at you warmly.`);
    options.push(`{A:name} watches you with a tender smile as you shift downward, lowering your head between
      {A:his} thighs.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You slide down, settling between {A:his} legs as {A:name} smiles, {A:his} {A:cock.thickCock}
        twitching in anticipation.`);
    }
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`You slide down, settling between {A:his} legs as {A:name} smiles warmly down at you, {A:his}
        {pussy} glistening.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You lick your lips hungrily as you slide down {A:name's} body, {A:he} watching with obvious
      need.`);
    options.push(`{A:name} moans eagerly as you settle between {A:his} legs, already leaning down.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`You settle between {A:his} legs, {A:name's} {A:cock.bigCock} already hard and waiting for
        you.`);
    }
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`You settle between {A:his} legs, {A:name's} {pussy} already soaked and waiting for you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You shift downward without complaint, settling between {A:his} legs.`);
    options.push(`{A:name} watches without comment as you slide down and settle between {A:his} legs.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`You slide down nervously, your hands trembling as you settle between {A:his} legs.`);
    options.push(`With a shaky breath, you lower yourself between {A:his} thighs.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`You grumble as you reluctantly slide down to settle between {A:his} legs.`);
    options.push(`With a huff, you shift downward, your body stiff as you lower your head between {A:his} thighs.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`You struggle as {A:name} forces you down between {A:his} legs.`);
    options.push(`You thrash, but {A:name} pushes your head down between {A:his} thighs anyway.`);
  }

  return Random.from(options);
}

function moveSixtyNine(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`With a playful smile, you turn yourself around atop {B:name}, and {B:he} eagerly shifts to bring
      {B:his} face level with your hips.`);
    options.push(`{B:name} giggles affectionately as you spin around on top of {B:him}, both of you settling into
      place for some mutual attention.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} shifts eagerly beneath you as you turn around, {B:his} {B:cock.thickCock} now within
        easy reach of your mouth.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} shifts eagerly beneath you as you turn around, {B:his} {pussy} now within easy reach of
        your mouth.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You turn yourself around atop {B:name}, who moans eagerly as {B:he} pulls your hips down toward
      {B:his} mouth.`);
    options.push(`{B:name} wastes no time repositioning beneath you as you spin around, hungry for a taste of you.`);
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`{B:name} arches up as you turn around, {B:his} {B:cock.bigCock} already twitching for your
        attention.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} spreads {B:his} legs eagerly as you turn around, {B:his} soaked {pussy} on full
        display.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You turn yourself around atop {B:name}, who shifts without complaint to settle into position.`);
    options.push(`{B:name} adjusts {B:his} legs as you turn around, letting you settle face-to-crotch.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`You turn yourself around atop {B:name}, who shifts nervously to accommodate the new position.`);
    options.push(`{B:name} adjusts {B:his} legs hesitantly as you turn around above {B:him}.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as you turn yourself around atop {B:him}, reluctantly shifting into position.`);
    options.push(`With a huff, {B:name} adjusts {B:his} legs as you spin around above {B:him}.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} struggles as you turn yourself around atop {B:him}, forcing {B:his} legs into position
      anyway.`);
    options.push(`{B:name} thrashes weakly as you force {B:him} to accommodate the new position.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} turns {A:him}self around atop you with a playful smile, and you eagerly shift to bring
      your face level with {A:his} hips.`);
    options.push(`You giggle affectionately as {A:name} spins around on top of you, both of you settling into place
      for some mutual attention.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You shift eagerly beneath {A:name} as {A:he} turns around, {A:his} {A:cock.thickCock} now within
        easy reach of your mouth.`);
    }
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`You shift eagerly beneath {A:name} as {A:he} turns around, {A:his} {pussy} now within easy
        reach of your mouth.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} turns {A:him}self around atop you, moaning eagerly as {A:he} pulls your hips down toward
      {A:his} mouth.`);
    options.push(`You waste no time repositioning beneath {A:name} as {A:he} spins around, hungry for a taste of
      you.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`You arch up as {A:name} turns around, {A:his} {A:cock.bigCock} already twitching for your
        attention.`);
    }
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`You spread your legs eagerly as {A:name} turns around, {A:his} soaked {pussy} within reach.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} turns {A:him}self around atop you without complaint, and you shift to settle into
      position.`);
    options.push(`You adjust your legs as {A:name} turns around, settling face-to-crotch.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} turns {A:him}self around atop you, and you shift nervously to accommodate the new
      position.`);
    options.push(`You adjust your legs hesitantly as {A:name} spins around above you.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`You grumble as {A:name} turns {A:him}self around atop you, reluctantly shifting into position.`);
    options.push(`With a huff, you adjust your legs as {A:name} spins around above you.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`You struggle as {A:name} turns {A:him}self around atop you, forcing your legs into position
      anyway.`);
    options.push(`You thrash weakly as {A:name} forces you to accommodate the new position.`);
  }

  return Random.from(options);
}
