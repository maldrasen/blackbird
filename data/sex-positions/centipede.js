// First kneeling behind second with face against second's ass. Second bent
// over in front of first. (Rimming and milking handjob position)
SexPosition.register('centipede',{
  name: 'Centipede',

  // Technically can suck cock in this position, but it's weird, having to pull
  // the cock backwards behind the person. Action text will need to consider
  // current position as well as attitude and everything else.
  alignment: {
    first: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock],
    },
    second: {
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
  },

  // We can move from standing reversed to centipede, but not back to standing.
  moves:[
    { code:'doggy-style', generator:moveDoggyStyle },
    { code:'kneeling-service', generator:moveKneelingService, swap:true },
    { code:'missionary-reversed', generator:moveMissionary },
    { code:'straddle', generator:moveStraddle },
  ],

  generateRearrange: rearrange,
});

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`Gently placing your hand on {B:name's} back, you guide {B:him} down into a kneeling position in
      front of you. {B:He} settles down affectionately, raising {B:his} ass for you as you kneel behind {B:him},
      pressing your face between {B:his} ass cheeks.`);
    options.push(`{B:name} smiles and lowers {B:him}self to {B:his} knees, eager for your attention as you settle
      in behind {B:him}, pressing a kiss to each cheek of {B:his} ass.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} bends over affectionately, {B:his} {B:cock.thickCock} swaying gently between {B:his}
        legs as you kneel behind {B:him}.`);
    }
    if (b.hasBreasts() && b.areBreastsExposed()) {
      options.push(`{B:name} lowers {B:him}self down, {B:his} {B:breasts.softBreasts} swaying gently beneath {B:him}
        as you settle behind {B:him}, pressing your face to {B:his} ass.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} drops eagerly to {B:his} knees, arching {B:his} back and spreading {B:his} thighs the
      moment you guide {B:him} down.`);
    options.push(`With a needy moan, {B:name} lowers {B:him}self in front of you, presenting {B:his} ass as you
      kneel behind {B:him}.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} spreads {B:his} legs eagerly, {B:his} soaked {pussy} glistening as you kneel behind
        {B:him}.`);
    }
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`{B:name} moans as {B:he} bends over, {B:his} hard {B:cock.bigCock} bobbing between {B:his}
        legs as you settle in behind {B:him}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`Gently placing your hand on {B:name's} back, you push {B:him} down into a kneeling position in
      front of you. Then, once {B:his} ass is raised, you kneel behind {B:him}, pressing your face between {B:his}
      ass cheeks.`);
    options.push(`{B:name} lowers {B:him}self onto {B:his} knees without complaint, letting you settle in behind
      {B:him}.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} bends over, {B:his} {B:cock.thickCock} hanging plainly between {B:his} legs, as you
        kneel behind {B:him}.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} bends over, {B:his} {pussy} visible between {B:his} legs, as you kneel behind
        {B:him}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} lowers {B:him}self onto {B:his} knees nervously, {B:his} body tense as you settle in
      behind {B:him}.`);
    options.push(`With a shaky breath, {B:name} kneels down, unsure what to expect as you press your face to
      {B:his} ass.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously bends over for you.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles, reluctantly raising {B:his} ass as you push {B:him} down into a kneeling
      position.`);
    options.push(`With a huff, {B:name} lowers {B:him}self to {B:his} knees, clearly unhappy about it.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} bends over reluctantly, {B:his} {B:cock.thickCock} swaying as {B:he} settles unhappily
        into position.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you force {B:him} down onto {B:his} knees, pinning {B:his} hips still as you
      press your face to {B:his} ass.`);
    options.push(`{B:name} struggles, but you shove {B:him} down onto {B:his} knees anyway, forcing {B:his} ass up
      toward you.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} thrashes, {B:his} {B:cock.thickCock} swinging wildly as you force {B:him} into
        position.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You give {A:name} a warm smile, slowly bending over in front of {A:him}. {A:He} watches with
      obvious affection as you raise your ass, then kneels behind you, pressing a gentle kiss between your cheeks.`);
    options.push(`{A:name} smiles warmly as you lower yourself onto your knees, settling in behind you and pressing
      {A:his} face lovingly against your ass.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`You bend over affectionately, your {B:cock.thickCock} swaying gently between your legs as
        {A:name} kneels behind you.`);
    }
    if (b.hasBreasts() && b.areBreastsExposed()) {
      options.push(`You lower yourself down, your {B:breasts.softBreasts} swaying gently beneath you as {A:name}
        settles behind you, pressing {A:his} face to your ass.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You give {A:name} a sly wink, slowly bending over in front of {A:him}. {A:He} watches hungrily as
      you raise your ass, then kneels behind you, pushing {A:his} face between your cheeks.`);
    options.push(`{A:name} licks {A:his} lips as you lower yourself onto your knees, quickly settling in behind you
      to bury {A:his} face against your ass.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`You spread your legs eagerly, your soaked {pussy} glistening as {A:name} kneels behind you.`);
    }
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`You moan as you bend over, your hard {B:cock.bigCock} bobbing between your legs as {A:name}
        settles in behind you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You bend over in front of {A:name} without complaint, and {A:he} kneels behind you, pressing
      {A:his} face to your ass.`);
    options.push(`You lower yourself onto your knees, and {A:name} settles in behind you without comment.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`You bend over, your {B:cock.thickCock} hanging plainly between your legs, as {A:name} kneels
        behind you.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`You bend over, your {pussy} visible between your legs, as {A:name} kneels behind you.`);
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

function moveDoggyStyle(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You raise up behind {B:name}, grabbing {B:his} hips affectionately as {B:he} arches {B:his} back
      invitingly for you.`);
    options.push(`{B:name} shifts eagerly, keeping {B:his} ass raised as you rise up and take hold of {B:his}
      hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`You raise up behind {B:name}, grabbing {B:his} hips as {B:his} {B:cock.thickCock} sways gently
        between {B:his} legs.`);
    }
    if (b.hasBreasts() && b.areBreastsExposed()) {
      options.push(`{B:name} arches {B:his} back, {B:his} {B:breasts.softBreasts} swaying as you raise up and take
        hold of {B:his} hips.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} moans as you rise up behind {B:him}, pressing {B:his} hips back into your grip
      eagerly.`);
    options.push(`You raise up behind {B:name}, grabbing {B:his} hips and letting your {A:cock.sixInch} long {cock}
      rest against the swell of {B:his} upturned ass.`);
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} arches {B:his} back, {B:his} soaked {pussy} on full display as you rise up behind
        {B:him}.`);
    }
    if (b.isFullyErect() && b.isCrotchExposed()) {
      options.push(`{B:name's} hard {B:cock.bigCock} bounces as you raise up behind {B:him}, gripping {B:his}
        hips.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You raise up and grab {B:name's} hips, positioning yourself behind {B:him}.`);
    options.push(`{B:name} stays in position without complaint as you rise up and take hold of {B:his} hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} stays in position, {B:his} {B:cock.thickCock} hanging between {B:his} legs, as you
        raise up and take hold of {B:his} hips.`);
    }
    if (b.hasNormalPussy() && b.isCrotchExposed()) {
      options.push(`{B:name} stays in position, {B:his} {pussy} visible between {B:his} legs, as you rise up
        behind {B:him}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} stays bent over nervously as you rise up and take hold of {B:his} hips.`);
    options.push(`With a shaky breath, {B:name} holds {B:his} position as you grab {B:his} hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.sixInch} long {cock} trembles as you rise up and take hold of {B:his}
        hips.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as you rise up and grab {B:his} hips, staying reluctantly in position.`);
    options.push(`With a huff, {B:name} holds still as you take hold of {B:his} hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} holds still reluctantly, {B:his} {B:cock.thickCock} swaying as you take hold of
        {B:his} hips.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you rise up and grab {B:his} hips, holding {B:him} in place.`);
    options.push(`{B:name} struggles, but you pull {B:his} hips back into position anyway.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} thrashes, {B:his} {B:cock.thickCock} swinging as you rise up and grab {B:his} hips.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} raises up and grabs your hips affectionately, positioning {A:him}self behind you.`);
    options.push(`You feel {A:name} rise up behind you, {A:his} hands gentle on your hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You feel {A:name} raising up behind you, grabbing your hips and letting {A:his}
        {A:cock.sixInch} long {cock} rest against the swell of your upturned ass.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`You feel {A:name's} {A:breasts.softBreasts} press warmly against your back as {A:he} rises up
        behind you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} growls with want as {A:he} rises up behind you, gripping your hips hard.`);
    options.push(`You feel {A:name} rise up eagerly behind you, {A:his} grip tightening on your hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} rises up behind you, letting {A:his} {A:cock.bigCock} rest heavily against the swell
        of your upturned ass.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:his} {A:breasts.softBreasts} drag against your back as {A:name} rises up hungrily behind
        you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} raises up and grabs your hips, positioning {A:him}self behind you.`);
    options.push(`You feel {A:name} rise up behind you without comment, taking hold of your hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} rises up, {A:his} {A:cock.thickCock} hanging behind you, as {A:he} takes hold of your
        hips.`);
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

// Moving into kneeling-service, "a" is always the one rising from bent-over to standing (was the receiver in
// centipede), while "b" stays on their knees behind them (was already kneeling, giving oral, in centipede).
function moveKneelingService(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`As you rise to your feet, {B:name} stays close behind, keeping {B:his} face affectionately
      pressed between your cheeks the whole way up.`);
    options.push(`You slowly stand, and {B:name} follows eagerly on {B:his} knees, refusing to lose contact with
      your ass.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`As you rise, your {A:cock.thickCock} swaying with the motion, {B:name} keeps {B:his} face
        pressed affectionately to your ass.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`Your {A:breasts.softBreasts} sway as you stand, {B:name} following closely, {B:his} face still
        pressed to your ass.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You rise to your feet as {B:name} moans, keeping {B:his} face pressed hungrily against your ass
      the whole way up.`);
    options.push(`{B:name} follows you up eagerly on {B:his} knees, unwilling to break contact as you stand.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`Your hard {A:cock.bigCock} bounces as you rise, {B:name} moaning against your ass the whole
        way up.`);
    }
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`Your glistening {pussy} is bared as you rise, {B:name} moaning hungrily against it.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You rise to your feet, and {B:name} follows on {B:his} knees without complaint, keeping {B:his}
      face against your ass.`);
    options.push(`{B:name} stays close behind as you stand, keeping {B:his} face pressed to your ass without
      protest.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`Your {A:cock.thickCock} sways gently as you rise to your feet, {B:name} following on {B:his}
        knees without complaint.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`You rise to your feet as {B:name} nervously stays close, keeping {B:his} face pressed to your
      ass.`);
    options.push(`{B:name} follows on {B:his} knees with a shaky breath, unsure what's expected as you stand.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`Your {A:cock.sixInch} long {cock} trembles as you rise nervously, {B:name} staying close
        behind.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles but stays on {B:his} knees as you rise to your feet, keeping {B:his} face
      reluctantly pressed to your ass.`);
    options.push(`With a huff, {B:name} follows you up, clearly unhappy about staying in position.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`Your {A:cock.thickCock} sways gently as you rise, {B:name} grumbling reluctantly but staying
        close.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} struggles as you rise, but you hold {B:his} head in place, forcing {B:him} to stay
      pressed to your ass.`);
    options.push(`{B:name} tries to pull away, but you keep a firm grip, forcing {B:him} to follow you up on
      {B:his} knees.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`Your {A:cock.thickCock} swings as you struggle to rise, {B:name} forced to stay pressed to your
        ass.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{A:name} rises to {A:his} feet, and you follow eagerly on your knees, keeping your face
      affectionately pressed between {A:his} cheeks.`);
    options.push(`You stay close behind as {A:name} slowly stands, refusing to lose contact with {A:his} ass.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} sways as {A:he} rises, and you keep your face affectionately pressed
        to {A:his} ass.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:his} {A:breasts.softBreasts} sway as {A:he} stands, and you follow closely, your face still
        pressed to {A:his} ass.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{A:name} rises to {A:his} feet, and you moan, keeping your face pressed hungrily against {A:his}
      ass as you follow on your knees.`);
    options.push(`You follow {A:name} up eagerly on your knees, unwilling to break contact as {A:he} stands.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{A:his} hard {A:cock.bigCock} bounces as {A:he} rises, and you moan against {A:his} ass.`);
    }
    if (a.hasNormalPussy() && a.isCrotchExposed()) {
      options.push(`{A:his} glistening {pussy} is bared as {A:he} rises, and you moan hungrily against it.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{A:name} rises to {A:his} feet, and you follow on your knees without complaint, keeping your face
      against {A:his} ass.`);
    options.push(`You stay close behind {A:name} as {A:he} stands, keeping your face pressed to {A:his} ass without
      protest.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} sways gently as {A:he} rises to {A:his} feet, and you follow on your
        knees without complaint.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} rises to {A:his} feet nervously, and you stay close on your knees, keeping your face
      pressed to {A:his} ass.`);
    options.push(`With {A:his} breath shaky, {A:name} rises to {A:his} feet as you follow closely on your knees.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.sixInch} long {cock} trembles as {A:he} rises nervously, and you stay close
        behind.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles as {A:he} rises to {A:his} feet, and you stay reluctantly on your knees,
      keeping your face pressed to {A:his} ass.`);
    options.push(`{A:name} huffs, clearly unhappy about standing, as you follow closely on your knees.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} sways as {A:he} grumbles and rises reluctantly, and you stay
        close.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} struggles as {A:he} rises, but you hold on, forcing your face to stay pressed against
      {A:his} ass.`);
    options.push(`{A:name} tries to pull away, but you keep a firm grip, forcing yourself to follow {A:him} up on
      your knees.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} swings as {A:he} struggles to rise, and you're forced to stay
        pressed to {A:his} ass.`);
    }
  }

  return Random.from(options);
}

function moveMissionary(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`{B:name} lowers {B:him}self flat onto {B:his} stomach with a contented sigh as you settle on top
      of {B:him}.`);
    options.push(`With obvious affection, {B:name} stretches out beneath you, letting you cover {B:his} body with
      your own.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{B:name} lowers {B:him}self flat as you settle on top, your {A:cock.thickCock} resting warmly
        against {B:his} lower back.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`Your {A:breasts.softBreasts} press against {B:his} back as you settle affectionately on top of
        {B:name}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} moans and lowers {B:him}self flat, arching {B:his} hips up as you settle on top of
      {B:him}.`);
    options.push(`Eager for more, {B:name} spreads out beneath you, pressing back against you as you lower yourself
      onto {B:his} back.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{B:name} moans as you settle on top, your hard {A:cock.bigCock} pressing eagerly against
        {B:his} lower back.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.thickCock} is trapped beneath {B:him} as you settle eagerly on top, grinding
        against {B:his} ass.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} lowers {B:him}self flat onto {B:his} stomach without complaint, letting you settle on
      top of {B:him}.`);
    options.push(`Without protest, {B:name} stretches out beneath you.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You settle on top of {B:name} without complaint, your {A:cock.thickCock} resting against
        {B:his} back.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} lowers {B:him}self flat nervously, {B:his} body tense as you settle on top of {B:him}.`);
    options.push(`With a shaky breath, {B:name} lies down beneath you.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.sixInch} long {cock} trembles nervously as you settle on top of {B:him}.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as {B:he} lowers {B:him}self flat, reluctantly letting you settle on top of
      {B:him}.`);
    options.push(`With a huff, {B:name} lies down beneath you, clearly unhappy about it.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} settles down reluctantly, {B:his} {B:cock.thickCock} shifting beneath {B:him} as you
        settle on top.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you force {B:him} down flat, pinning {B:him} beneath your weight.`);
    options.push(`{B:name} struggles, but you push {B:him} down onto {B:his} stomach and settle on top anyway.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.thickCock} is trapped as {B:he} thrashes beneath you, pinned to the bed.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You lower yourself flat with a contented sigh as {A:name} settles warmly on top of you.`);
    options.push(`{A:name} covers your body with {A:his} own affectionately as you stretch out beneath {A:him}.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} settles on top of you, {A:his} {A:cock.thickCock} resting warmly against your lower
        back.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:his} {A:breasts.softBreasts} press against your back as {A:name} settles affectionately on
        top of you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You moan and lower yourself flat, arching your hips up as {A:name} settles eagerly on top of
      you.`);
    options.push(`{A:name} presses down against you hungrily as you spread out beneath {A:him}.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`You moan as {A:name} settles on top, {A:his} hard {A:cock.bigCock} pressing eagerly against
        your lower back.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`Your {B:cock.thickCock} is trapped beneath you as {A:name} settles eagerly on top, grinding
        against your ass.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You lower yourself flat without complaint, letting {A:name} settle on top of you.`);
    options.push(`Without protest, you stretch out beneath {A:name}.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} settles on top of you without complaint, {A:his} {A:cock.thickCock} resting against
        your back.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} settles on top of you nervously, {A:his} body tense.`);
    options.push(`With a shaky breath, {A:name} lies down flat on top of you.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.sixInch} long {cock} trembles nervously as {A:he} settles on top of you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles as {A:he} lowers {A:him}self on top of you, reluctantly settling into place.`);
    options.push(`With a huff, {A:name} lies down on top of you, clearly unhappy about it.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} shifts as {A:he} settles reluctantly on top of you.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you pull {A:him} down on top of you anyway, {A:his} struggles doing nothing
      to stop you.`);
    options.push(`{A:name} struggles, but you keep pulling {A:him} down on top of you regardless.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} is trapped as {A:he} thrashes on top of you, unable to break
        free.`);
    }
  }

  return Random.from(options);
}

function moveStraddle(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You climb up onto {B:name's} back, straddling {B:his} waist as {B:he} settles down flat with a
      contented sigh.`);
    options.push(`{B:name} lowers {B:him}self onto {B:his} stomach affectionately as you rise up and swing a leg
      over {B:his} hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You climb up onto {B:name's} back, your {A:cock.thickCock} resting warmly along {B:his} spine
        as {B:he} settles down flat beneath you.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`Your {A:breasts.softBreasts} press affectionately against {B:his} back as you settle astride
        {B:name's} hips.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`{B:name} moans as {B:he} lowers {B:him}self flat, arching {B:his} back as you climb up to
      straddle {B:his} waist.`);
    options.push(`Eager for more, {B:name} spreads out beneath you as you rise up and settle astride {B:his}
      hips.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`{B:name} moans as you climb up, your hard {A:cock.bigCock} dragging along {B:his} back as you
        settle astride {B:his} hips.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.thickCock} is trapped beneath {B:him} as you climb up eagerly to straddle
        {B:his} waist.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`{B:name} lowers {B:him}self flat onto {B:his} stomach without complaint as you climb up to
      straddle {B:his} waist.`);
    options.push(`Without protest, {B:name} stretches out beneath you as you settle astride {B:his} hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`You climb up to straddle {B:name's} waist without complaint, your {A:cock.thickCock} resting
        along {B:his} back.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{B:name} lowers {B:him}self flat nervously as you climb up to straddle {B:his} waist.`);
    options.push(`With a shaky breath, {B:name} lies down flat as you settle astride {B:his} hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.sixInch} long {cock} trembles nervously as you climb up to straddle {B:his}
        waist.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as {B:he} lowers {B:him}self flat, reluctantly letting you climb up to
      straddle {B:his} waist.`);
    options.push(`With a huff, {B:name} lies down as you settle astride {B:his} hips.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name} lies down reluctantly, {B:his} {B:cock.thickCock} shifting beneath {B:him} as you
        climb up to straddle {B:his} waist.`);
    }
  }

  if (a.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{B:name} thrashes as you force {B:him} down flat, climbing up to straddle {B:his} waist
      regardless.`);
    options.push(`{B:name} struggles, but you push {B:him} down and settle astride {B:his} hips anyway.`);
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`{B:name's} {B:cock.thickCock} is trapped as {B:he} thrashes beneath you, pinned to the bed.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.loving) {
    options.push(`You lower yourself flat with a contented sigh as {A:name} climbs up to straddle your waist.`);
    options.push(`{A:name} rises up affectionately, swinging a leg over your hips as you settle down flat beneath
      {A:him}.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} climbs up onto your back, {A:his} {A:cock.thickCock} resting warmly along your spine
        as you settle down flat beneath {A:him}.`);
    }
    if (a.hasBreasts() && a.areBreastsExposed()) {
      options.push(`{A:his} {A:breasts.softBreasts} press affectionately against your back as {A:name} settles
        astride your hips.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.lustful) {
    options.push(`You moan and lower yourself flat, arching your back as {A:name} climbs up to straddle your
      waist.`);
    options.push(`{A:name} rises up eagerly, settling astride your hips as you spread out beneath {A:him}.`);
    if (a.isFullyErect() && a.isCrotchExposed()) {
      options.push(`You moan as {A:name} climbs up, {A:his} hard {A:cock.bigCock} dragging along your back as
        {A:he} settles astride your hips.`);
    }
    if (b.hasNormalCock() && b.isCrotchExposed()) {
      options.push(`Your {B:cock.thickCock} is trapped beneath you as {A:name} climbs up eagerly to straddle your
        waist.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.accepting) {
    options.push(`You lower yourself flat without complaint as {A:name} climbs up to straddle your waist.`);
    options.push(`Without protest, you stretch out beneath {A:name} as {A:he} settles astride your hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:name} climbs up to straddle your waist without complaint, {A:his} {A:cock.thickCock}
        resting along your back.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.fearful) {
    options.push(`{A:name} climbs up nervously to straddle your waist as you lie flat beneath {A:him}.`);
    options.push(`With a shaky breath, {A:name} settles astride your hips.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.sixInch} long {cock} trembles nervously as {A:he} climbs up to straddle your
        waist.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.resistant) {
    options.push(`{A:name} grumbles as {A:he} climbs up to straddle your waist, clearly reluctant about it.`);
    options.push(`With a huff, {A:name} settles astride your hips, unhappy about the whole thing.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} shifts as {A:he} climbs up reluctantly to straddle your waist.`);
    }
  }

  if (b.isPlayer() && context.attitude === Attitude.violent) {
    options.push(`{A:name} thrashes as you pull {A:him} up to straddle you anyway, {A:his} struggles doing nothing
      to stop you.`);
    options.push(`{A:name} struggles, but you keep pulling {A:him} onto your hips regardless.`);
    if (a.hasNormalCock() && a.isCrotchExposed()) {
      options.push(`{A:his} {A:cock.thickCock} swings as {A:he} thrashes, unable to stop you from pulling {A:him}
        astride your hips.`);
    }
  }

  return Random.from(options);
}
