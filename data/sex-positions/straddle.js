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
    options.push(`{B:name} settles onto {B:his} stomach with a warm smile, glancing back over {B:his} shoulder as you climb astride {B:his} hips.`);
    options.push(`You guide {B:name} down onto {B:his} stomach, straddling {B:his} hips as {B:he} stretches out beneath you, resting {B:his} cheek against folded arms.`);
    options.push(`{B:name} turns {B:his} head to smile at you, settling comfortably onto {B:his} stomach as you swing a leg over to straddle {B:his} hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} settles down with a contented sigh as you climb astride {B:his} hips, your {A:cock.thickCock} resting warmly along the curve of {B:his} spine.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`You lean down to press a kiss between {B:his} shoulder blades, your {A:breasts.softBreasts} grazing lightly along {B:his} back as you settle into place.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} flops eagerly onto {B:his} stomach, arching {B:his} back as you swing a leg over to straddle {B:his} hips.`);
    options.push(`{B:name} can't help but grind {B:his} hips into the sheets as you climb astride {B:him}, {B:his} breath already coming quick.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} moans as you settle astride {B:his} hips, letting your {A:cock.thickCock} drag heavily along the small of {B:his} back.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{B:name} shivers eagerly as your {A:breasts.bigSoftBreasts} drag along {B:his} back while you settle astride {B:his} hips.`);
      if (a.breastsAreAtLeast('big')) {
        options.push(`Your {A:breasts.bigBreasts} drape heavily over {B:his} shoulders as you lean down, making {B:him} groan with want.`);
      }
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} lies down on {B:his} stomach without complaint, letting you settle astride {B:his} hips.`);
    options.push(`{B:name} settles onto {B:his} stomach, allowing you to climb astride {B:his} hips without protest.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} lies face down as you settle astride {B:his} hips, your {A:cock.thickCock} resting against {B:his} lower back.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{B:name} stretches out beneath you as you settle into place, your {A:breasts.softBreasts} brushing lightly over {B:his} shoulders.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} lowers {B:him}self face-down with a nervous breath, tensing as you climb on top to straddle {B:his} hips.`);
    options.push(`{B:name's} hands curl into the sheets as {B:he} lies face down, {B:his} body tense while you settle astride {B:his} hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} flinches slightly as you settle astride {B:his} hips, your {A:cock.thickCock} pressing against {B:his} lower back.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as you push {B:him} down onto {B:his} stomach, straddling {B:his} hips despite {B:his} half-hearted squirming.`);
    options.push(`{B:name} huffs, turning {B:his} face away as you climb astride {B:his} hips, {B:his} stomach pressed reluctantly into the sheets.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} stiffens as you settle astride {B:his} hips, your {A:cock.thickCock} pressing against {B:his} lower back.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you shove {B:him} face-down, pinning {B:him} beneath your weight as you straddle {B:his} hips.`);
    options.push(`{B:name} struggles beneath you, twisting uselessly as you force {B:him} down onto {B:his} stomach and settle astride {B:his} hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} bucks weakly as you pin {B:him} down, your {A:cock.thickCock} pressing hard against {B:his} lower back as you straddle {B:his} hips.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You settle onto your stomach as {A:name} smiles warmly down at you, climbing astride your hips and trailing a fond hand along your spine.`);
    options.push(`{A:name} gently guides you down onto your stomach, {A:his} smile lingering as {A:he} settles astride your hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`You settle face down, your {B:cock.sixInch} long {cock} trapped beneath you, as {A:name} climbs astride your hips with a warm smile.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:name} leans down to press a kiss between your shoulder blades, {A:his} {A:breasts.softBreasts} grazing your back as {A:he} settles into place.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You settle onto your stomach as {A:name} climbs eagerly astride your hips, a hungry grin on {A:his} face.`);
    options.push(`{A:name} practically pounces, straddling your hips the moment you're down, {A:his} breath quick with want.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`You lie face down, your {B:cock.sixInch} long {cock} trapped beneath you, as {A:name} settles astride your hips with a hungry grin.`);
    }
    if (a.hasBreasts() && a.breastsAreAtLeast('big') && a.areBreastsExposed()) {
      options.push(`{A:his} {A:breasts.bigBreasts} drag along your back as {A:name} leans down, moaning eagerly into your ear.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You lie down on your stomach, letting {A:name} settle astride your hips.`);
    options.push(`You settle face down without complaint, and {A:name} climbs astride your hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`You lie face down, your {B:cock.sixInch} long {cock} trapped beneath you, as {A:name} settles astride your hips.`);
    }
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
    options.push(`You slide down along {B:name's} back, placing a soft kiss between {B:his} shoulder blades. {B:He} sighs happily and rises onto {B:his} knees, arching back into your touch as you settle behind {B:him}, pressing your face between {B:his} ass cheeks.`);
    options.push(`Trailing your fingers down {B:name's} spine, you climb off. {B:He} smiles over {B:his} shoulder and rises onto {B:his} knees for you, and you kneel behind {B:him}, nuzzling into the cleft of {B:his} ass.`);
    options.push(`{B:name} shifts up onto {B:his} knees without needing to be asked, humming contentedly as you settle in behind {B:him} and press an affectionate kiss to each cheek of {B:his} ass.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} rises onto {B:his} knees, {B:his} {B:cock.thickCock} swaying gently between {B:his} legs as you settle in behind {B:him}, pressing your face to {B:his} ass.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You climb off {B:name}, and {B:he} moans with need, eagerly rising onto {B:his} knees and arching {B:his} back before you bury your face between {B:his} spread cheeks.`);
    options.push(`{B:name} can't wait, hauling {B:his} own hips up onto {B:his} knees the moment you slide back, spreading {B:him}self open as you press your face hungrily against {B:his} ass.`);
    options.push(`{B:name} whines impatiently as you climb off, practically throwing {B:him}self onto {B:his} knees and spreading {B:his} thighs for you.`);
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`{B:name} rocks {B:his} hips as {B:he} rises onto {B:his} knees, {B:his} {B:cock.bigCock} already hard and bobbing as you settle in behind {B:him}.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} rises onto {B:his} knees with a needy moan, {B:his} glistening {pussy} on full display as you settle in behind {B:him}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You climb off of {B:name}, guiding {B:him} up onto {B:his} knees before settling in behind {B:him}, your face pressed to {B:his} ass.`);
    options.push(`{B:name} shifts up onto {B:his} knees without complaint as you climb off, letting you settle in behind {B:him}.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} rises onto {B:his} knees, {B:his} {B:cock.thickCock} hanging between {B:his} legs, as you settle in behind {B:him}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`You climb off {B:name}, coaxing {B:him} onto {B:his} knees. {B:His} hands tremble as {B:he} obeys, and you settle in behind {B:him}, pressing your face against {B:his} ass.`);
    options.push(`{B:name} rises onto {B:his} knees on shaky legs, glancing nervously back over {B:his} shoulder as you settle in behind {B:him}.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.sixInch} long {cock} trembles between {B:his} legs as {B:he} nervously rises onto {B:his} knees for you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`You climb off {B:name} and haul {B:him} up onto {B:his} knees. {B:He} grumbles under {B:his} breath but doesn't fight you as you press your face against {B:his} ass.`);
    options.push(`{B:name} sighs heavily, dragging {B:him}self up onto {B:his} knees with obvious reluctance as you settle in behind {B:him}.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you climb off {B:him}, but you wrench {B:him} up onto {B:his} knees anyway, forcing your face hard against {B:his} ass despite {B:his} struggling.`);
    options.push(`{B:name} snarls and tries to twist away, but you force {B:him} onto {B:his} knees, pinning {B:his} hips still as you press your face to {B:his} ass.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} slides off of you, gently guiding you up onto your knees. You shiver as {A:he} settles in behind you, pressing {A:his} face lovingly against your ass.`);
    options.push(`{A:name} presses a fond kiss to your shoulder before sliding off you, helping you rise onto your knees and settling in behind you with a warm hand on your hip.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`You rise onto your knees, your {B:cock.thickCock} swaying beneath you, as {A:name} settles in fondly behind you, pressing {A:his} face to your ass.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} climbs off you eagerly, hauling you up onto your knees before burying {A:his} face hungrily between your cheeks.`);
    options.push(`{A:name} groans with want as {A:he} climbs off you, urging you up onto your knees before pressing {A:his} face eagerly against your ass.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`You rise onto your knees, your {B:cock.bigCock} bobbing beneath you, as {A:name} growls hungrily and presses {A:his} face against your ass.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`You rise onto your knees, your glistening {pussy} on full display, as {A:name} moans and presses {A:his} face hungrily against your ass.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} climbs off of you, guiding you up onto your knees before kneeling behind you, pressing {A:his} face to your ass.`);
    options.push(`{A:name} slides off you and helps you up onto your knees, settling in behind you without comment.`);
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
    options.push(`You roll onto your back as {B:name} smiles warmly down, shifting forward to straddle your hips, facing you now.`);
    options.push(`{B:name} gazes at you fondly as you roll onto your back, {B:he} shifts forward and settles astride your hips, taking your hand in {B:his}.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`You roll onto your back as {B:name} shifts forward, {B:his} {B:cock.thickCock} swaying gently as {B:he} settles astride your hips, smiling down at you.`);
    }
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`You roll onto your back, your {A:cock.thickCock} standing between you, as {B:name} smiles warmly and settles astride your hips.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You roll onto your back as {B:name} grins hungrily, scooting eagerly forward to straddle your waist, facing you.`);
    options.push(`{B:name} licks {B:his} lips hungrily as you roll onto your back, quickly scooting forward to straddle your hips.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`You roll onto your back, your {A:cock.thickCock} standing up between you as {B:name} scoots eagerly forward to straddle your hips, facing you.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name}'s {B:cock.bigCock} bounces as {B:he} scoots eagerly forward, settling astride your hips with a hungry grin.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You roll onto your back, letting {B:name} shift forward to straddle your hips facing you.`);
    options.push(`{B:name} shifts forward without complaint as you roll onto your back, settling astride your hips to face you.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You roll onto your back, your {A:cock.thickCock} resting between you, as {B:name} settles astride your hips.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`You roll onto your back as {B:name} shifts forward nervously, {B:his} hands trembling slightly as {B:he} settles astride your hips, now facing you directly.`);
    options.push(`{B:name} bites {B:his} lip nervously as {B:he} shifts forward, avoiding your eyes as {B:he} settles astride your hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name}'s {B:cock.sixInch} long {cock} trembles as {B:he} nervously shifts forward and settles astride your hips.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`You roll onto your back as {B:name} reluctantly slides forward, jaw tight and eyes averted as {B:he} settles astride your hips, facing you.`);
    options.push(`{B:name} exhales sharply, forcing {B:him}self to shift forward and settle astride your hips despite {B:his} obvious discomfort.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`You're forced onto your back as {B:name} shifts forward, straddling your hips while pinning you with {B:his} weight.`);
    options.push(`{B:name} shoves you onto your back and scoots forward roughly, pinning your hips beneath {B:him} as {B:he} settles into place.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} rolls onto {A:his} back beneath you, smiling up as you shift yourself forward, straddling {A:his} hips to face {A:him}.`);
    options.push(`{A:name} reaches up to cup your cheek as {A:he} rolls onto {A:his} back, smiling as you shift forward to straddle {A:his} hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} rolls onto {A:his} back, {A:his} {A:cock.thickCock} lying against {A:his} stomach, as you shift forward to straddle {A:his} hips, smiling down at {A:him}.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:name} rolls onto {A:his} back, {A:his} {A:breasts.softBreasts} settling against {A:his} chest, as you shift forward to straddle {A:his} hips.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} flips onto {A:his} back with an eager grin as you scoot forward, straddling {A:his} waist to face {A:him} properly.`);
    options.push(`{A:name} moans softly, flipping onto {A:his} back eagerly as you scoot forward, quickly settling astride {A:his} hips.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{A:name} rolls onto {A:his} back, {A:his} {A:cock.thickCock} standing between you as you shift forward to straddle {A:his} hips.`);
    }
    if (a.hasBreasts() && a.breastsAreAtLeast('big') && a.areBreastsExposed()) {
      options.push(`{A:his} {A:breasts.bigSoftBreasts} settle against {A:his} chest as {A:name} flips onto {A:his} back with a hungry grin, watching you settle astride {A:his} hips.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} rolls onto {A:his} back, letting you shift forward to straddle {A:his} hips facing {A:him}.`);
    options.push(`{A:name} rolls onto {A:his} back without protest, letting you settle astride {A:his} hips.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} nervously turns onto {A:his} back beneath you as you shift forward, straddling {A:his} hips to face {A:him}.`);
    options.push(`{A:name's} hands tremble slightly as {A:he} turns onto {A:his} back, avoiding your eyes as you shift forward to straddle {A:his} hips.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} reluctantly rolls onto {A:his} back as you scoot forward, straddling {A:his} hips and forcing {A:him} to look up at you.`);
    options.push(`{A:name} huffs and turns away, tension in {A:his} body as {A:he} reluctantly rolls onto {A:his} back while you settle astride {A:his} hips.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you force {A:him} onto {A:his} back, but you shift forward anyway, straddling {A:his} hips and pinning {A:him} beneath your weight.`);
    options.push(`{A:name} kicks and twists as you force {A:him} onto {A:his} back, but you settle astride {A:his} hips anyway, pinning {A:him} down.`);
  }

  return Random.from(options);
}

function moveDoggyStyle(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You slide back along {B:name's} back, your hands caressing {B:his} shoulders as {B:he} affectionately raises {B:his} hips and bend forward, exposing {B:him}self completely before you.`);
    options.push(`{B:name} arches {B:his} back and lifts {B:his} hips as you ease backward, positioning {B:him}self to be taken roughly.`);
    options.push(`You slide your weight back while {B:name} raises {B:his} hips, bending over so {B:his} rounded ass pushes up toward you.`);
    options.push(`{B:name} smiles at you, raising {B:his} hips while spreading {B:his} thighs and arching {B:his} back, knowing how completely exposed it makes {B:him} look in front of you.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} raises {B:his} hips, {B:his} {B:cock.thickCock} swaying beneath {B:him} as {B:he} bends forward, presenting {B:him}self fully to you.`);
    }
    if (b.hasBreasts() && b.areBreastsExposed()) {
      options.push(`{B:name} bends forward with a warm smile, {B:his} {B:breasts.softBreasts} swaying gently as {B:he} raises {B:his} hips for you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} has a hungry look in {B:his} eyes as you slide back behind {B:him}. {B:He} lets out a low moan as {B:he} raises {B:his} ass into the air and spreads {B:his} legs slightly.`);
    options.push(`{B:name} arches {B:his} back and raises {B:his} ass upward as you slide back, {B:his} thighs parting for you as you position yourself behind {B:him}.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} raises {B:his} ass as you position yourself behind {B:him}, letting your {A:cock.thickCock} rest heavily between {B:his} ass cheeks.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} spreads {B:his} legs, {B:his} glistening {pussy} on full display as {B:he} raises {B:his} ass for you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} raises {B:his} hips as you slide back, bending over and lifting {B:his} ass into position.`);
    options.push(`{B:name} bends over without complaint, raising {B:his} hips as you position yourself behind {B:him}.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} raises {B:his} hips, {B:his} {B:cock.thickCock} hanging beneath {B:him}, as you position yourself behind {B:him}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} quickly lifts {B:his} hips, bending forward as you slide backward, taking position behind {B:him}.`);
    options.push(`With nervous obedience, {B:name} arches {B:his} back and raises {B:his} hips submissively as you slide behind {B:him}.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} spreads {B:his} legs hesitantly, exposing {B:his} {pussy} as {B:he} raises {B:his} hips with a nervous breath.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} exhales softly as you take hold of the back of {B:his} head, pushing {B:his} face down. Reluctantly, {B:he} raises {B:his} ass upward as you position yourself behind {B:him}.`);
    options.push(`{B:name} grumbles, dragging {B:his} own hips up reluctantly as you position yourself behind {B:him}.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} raises {B:his} hips reluctantly, {B:his} {B:cock.thickCock} hanging beneath {B:him} as you position yourself behind {B:him}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you slide back, but with a firm grip on {B:his} hips you pull {B:his} ass upward as you position yourself behind {B:him}.`);
    options.push(`{B:name} snarls and tries to twist away, but you grip {B:his} hips and force them upward as you position yourself behind {B:him}.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You feel {A:name} sliding along your back, {A:his} hands resting on your hips as your raise your ass high into the air.`);
    options.push(`{A:name} presses a fond kiss to your lower back as {A:he} positions {A:him}self behind you, hands resting warmly on your hips.`);
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`You feel {A:name} sliding backwards, dragging {A:his} hard {A:breasts.thickNipples} along your back as {A:he} positions {A:him}self behind you.`);
    }
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} lets {A:his} {A:cock.thickCock} drag hotly across your back as {A:he} positions {A:him}self behind you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} squeezes your hips as {A:he} positions himself behind you, watching hungrily as you raise your ass into the air and spread your legs slightly.`);
    options.push(`{A:name} growls appreciatively as {A:he} positions {A:him}self behind you, gripping your hips hard.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} squeezes your hips as you raise your ass into the air, spreading your ass cheeks as {A:he} slaps {A:his} {A:cock.thickCock} between them.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:his} hard {A:breasts.thickNipples} drag along your back as {A:he} settles hungrily behind you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} watches as you raise your ass up into the air, positioning {A:him}self behind you.`);
    options.push(`{A:name} positions {A:him}self behind you without comment as you raise your ass for {A:him}.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} positions {A:him}self behind you, {A:his} {A:cock.thickCock} brushing against your thigh.`);
    }
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
    options.push(`You gently roll {B:name} onto {B:his} back. {B:He} lets out a soft moan as {B:he} spreads {B:his} legs open wide for you.`);
    options.push(`{B:name} turns over underneath you, {B:his} eyes full of warmth as {B:he} wraps {B:his} legs around your waist, pulling you tightly against {B:him}.`)
    options.push(`{B:name} slowly tuns beneath you, {B:his} affectionate hands caressing your back as you settle between {B:his} spread legs.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} eagerly flips onto their back with obvious need, spreading {B:his} legs wide while grinding against you.`);
    options.push(`With an excited moan, {B:name} rolls face up, wrapping {B:his} legs tightly around you while pulling you close.`);
    options.push(`{B:name} bucks {B:his} hips as {B:he} turns over under you. With a deft maneuver {B:he} spreads {B:his} legs wide, wrapping them around you, inviting you inward.`);

    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} writhes lustfully beneath you, spreading {B:his} legs wide and arching upward, presenting their soaked cunt for you to use however you like.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} writhes lustfully beneath you, spreading {B:his} legs wide and arching upward, presenting {B:his} {B:cock.thickCock} for you to use however you like.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} turns face up beneath you, spreading {B:his} legs obediently.`);
    options.push(`{B:name} shifts onto {B:his} back, allowing you to settle between {B:his} legs.`);
    options.push(`{B:name} slowly rolls onto {B:his} back, {B:his} legs parting just enough for you to push between them.`);
    options.push(`Accepting the change of position without protest, {B:name} slowly turns over, parting {B:his} legs for you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} quickly turns face up beneath you, parting {B:his} legs submissively.`);
    options.push(`Reaching down, you take hold of {B:name's} shoulder, turning {B:him} over underneath you as you push between {B:his} legs.`);
    options.push(`With {B:his} fearful eyes averted, {B:name} allows you to turn them over, {B:his} body tense yet compliant as you push yourself between {B:his} spread thighs.`);

    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`Fearful but obedient, {B:name} rolls over without resistance. With your hands on {B:his} knees you spread {B:his} legs wide to expose {B:his} quivering snatch to your gaze.`);
    }
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`Fearful but obedient, {B:name} rolls over without resistance. With your hands on {B:his} knees you spread {B:his} legs wide to expose {B:his} throbbing cock to your gaze.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`Grabbing onto {B:name's} legs, you forcefully turn {B:him} over underneath you.`);
    options.push(`{B:name} lets out an unhappy groan as you roll {B:him} onto {B:his} back. {B:He} tries to keep {B:his} thighs closed but fails as your strong hands spread {B:him} wide open.`);
    options.push(`Still trying to resist you, {B:name} struggles as you turn them face up, {B:his} body stiff as you push between {B:his} legs.`);
    options.push(`{B:name} lets out an unhappy huff as {B:he} turns over under you, shaking {B:his} head as you spread {B:his} legs wide open beneath you.`);
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`Angrily fighting back, {B:name} thrashes as you roll {B:him} over underneath you, {B:his} legs kicking wildly but uselessly as you spread them apart.`);
    options.push(`{B:name} bucks beneath as you roll them over, forcing their thighs apart despite {B:his} efforts to stop you.`);
    options.push(`{B:name's} body writhes in anger as you turn them over underneath you, but {B:he} can't stop you as you pull {B:his} legs wide open.`);
    options.push(`{B:name} kicks and twists as you turn them over, but {B:he} can't stop you from pushing your body between {B:his} wide spread legs.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} smiles down at you as you roll over onto your back.`);
    options.push(`You slowly turn face up, gazing up into {A:name's} smiling face as {A:he} shifts above you.`);
    options.push(`{A:name} arches {A:his} back as {A:he} lifts up slightly, letting you roll over underneath {A:him} before lowering {A:his} body back down on top of you.`);

    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You feel {A:name's} cock dangling over your legs as you turn over underneath {A:him}.`)
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`You can feel {A:name's} hard nipples brushing over your skin as you turn over underneath {A:him}.`)
    }
    if (a.hasBreasts() && a.breastsAreAtLeast('big') && a.areBreastsExposed()) {
      options.push(`{A:name} smiles warmly, {A:his} {A:breasts.bigBreasts} dangling heavily above as you turn face up underneath {A:him}.`)
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} smiles and licks {A:his} lips, watching as you turn over underneath {A:him}.`);

    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:name} moans, leaning down to let {A:his} nipples glide over your skin as you turn over underneath {A:him}.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{A:name} smiles and licks {A:his} lips as {A:he} watches you turn over, your {B:cock.sixInch} long {cock} slapping heavily against your thigh.`);
    }
    if (a.hasNormalPussy() && b.hasNormalCock() && a.isCrotchExposed() && b.isCrotchExposed()) {
      options.push(`{A:name} moans, rubbing {A:his} {pussy} firmly over your {cock} as you position yourself underneath {A:him}.`);
    }
    if (a.hasNormalCock() && b.hasNormalCock() && a.isCrotchExposed() && b.isCrotchExposed()) {
      options.push(`{A:name} grins as you turn over underneath {A:him}, your cocks slapping together as {A:he} lowers {A:his} body onto yours.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} watches as you turn over onto your back underneath {A:him}.`);
    options.push(`{A:name} raises {A:his} hips slightly, letting you roll over underneath {A:him}.`);
    options.push(`{A:name} nods as you roll beneath {A:him}, positioning {A:him}self between your spread legs.`);
    options.push(`{A:name} wiggles {A:his} hips, letting you turn over underneath {A:him} before leaning down against your chest.`);
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} gasps slightly as you start to turn over underneath {A:him}.`);
    options.push(`You feel {A:name} shudder slightly and turn to look away as you roll over underneath {A:him}, afraid of what's to come.`);

    if (b.hasNormalCock() === false) {
      options.push(`{A:name's} eyes widen as you start to turn over underneath {A:him}, wrapping your legs around {A:his} waist to pull {A:him} in towards you.`);
    }
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`{A:name's} eyes widen as you turn over underneath {A:him}, your {B:cock.sixInch} long cock raising up underneath {A:him}.`)
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} frowns as {A:he} watches you turn over underneath {A:him}.`);
    options.push(`{A:name} huffs and looks away as you turn over underneath {A:him}, feeling more exposed now that you're facing {A:him}.`);

    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{A:name} frowns as {A:he} feels your {B:cock.bigCock} sliding across {A:his} thigh as you turn over underneath him.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:name} tries to back away as you turn over underneath {A:him}, but can't stop your flesh from brushing against {A:his} hard {A:breasts.inchLongNipples}.`);
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
