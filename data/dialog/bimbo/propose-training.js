// Bimbos love sex and are kind of stupid. We'll eventually have a personality monitoring system to ensure that bimbo
// characters never get too smart. Bimbos will also always be females or futas so we know they at least have tits,
// though not always necessarily large tits.

Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Eager, context => {
  const player = Character(context.P);
  const partner = Character(context.T);

  if (player.hasNormalCock()) {
    if (partner.breastsAreAtLeast('huge') && partner.areBreastsExposed() &&
      partner.wouldConsentTo('get-titfuck') && Random.roll(10) < 1) {
      return `{T:name} grins widely and grabs {T:his} {T:breasts.bigRoundBreasts}, squeezing them 
        together roughly, "Mmm, yes! I want you to fuck my titties really hard this time."`
    }
    if (partner.hasSexualPreference('cock-lover') && partner.wouldConsentTo('get-blowjob') && Random.roll(10)<1) {
      return `{setPosition(kneeling-dominant)} {T:name} grins and drops to {T:his} knees. 
        {T:He} opens his mouth wide and says, "Ahhh...."`
    }
  }

  const motionOptions = [
    `{T:name} presses {T:his} soft body against you, pushing your arm between {T:his} {T:breasts.bigSoftBreasts}.`,
    `{T:name} bounces on {T:his} heels, eyes lighting up with excitement.`,
    `{T:name} twirls a lock of {T:his} hair around a finger while giggling.`,
    `{T:name's} eyes widen with delight as {T:he} starts to rubs {T:his} thighs together.`];
  const dialogOptions = [
    `Time to make me cum again? Okay {T:niceName}.`];

  if (partner.hasSexualPreference('anal-slut',30) && partner.isAnusEmpty()) {
    dialogOptions.push(`Please {T:niceName}, my little butthole feels so empty right now.`);
    dialogOptions.push(`Oh yes, I need something really thick in my ass {T:niceName}.`);
  }

  if (partner.breastsAreAtLeast('big')) {
    motionOptions.push(`{T:name} bounces in place, {T:his} {T:breasts.bigBreasts} bouncing enticingly.`);
    motionOptions.push(`The bimbo claps {T:his} hands excitedly, {T:his} {T:breasts.bigBreasts} bouncing wildly.`);
    motionOptions.push(`{T:name} skips closer, {T:his} ample cleavage heaving with each step.`); }

  if (player.cockIsAtLeast('big')) {
    dialogOptions.push(`Yes {T:niceName}, I can't wait to feel your {P:cock.bigCock} stretching me open.`); }

  if (player.hasNormalCock() && partner.wouldConsentTo('get-blowjob')) {
    dialogOptions.push(`Hehehe. {T:niceName} needs {P:his} {cock} sucked again?`);
    dialogOptions.push(`Ohmygod, yes! I wanna be your favorite little cock sucker!`); }

  if (partner.wouldConsentTo('get-rimming')) {
    dialogOptions.push(`Hehe. Sure thing {T:niceName}. You can make me lick your butthole if you want to.`); }

  if (partner.hasNormalCock()) {
    dialogOptions.push(`Ohmygod, yes {T:niceName}! I wanna be your favorite cum-spraying little slut!`)

    if (partner.isCrotchExposed()) {
      motionOptions.push(`{T:name} grins and bounces on {T:his} heels, {T:his} {T:breasts.bigRound} tits 
        bouncing while {T:his} {T:cock.thickSixInchLongCock} swings heavily between {T:his} thighs.`);
      motionOptions.push(`{T:name} grins and presses {T:his} body against you, letting 
        {T:his} {T:cock.thickSixInchLongCock} press firmly against your leg.`)
    }
  }

  console.log(`Eager bimbo dialog counts: Motion:${motionOptions.length} Dialog:${dialogOptions.length}`)

  return `${Random.from(motionOptions)} "${Random.from(dialogOptions)}"`;
});

Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Willing, context => {
  const player = Character(context.P);
  const partner = Character(context.T);

  const motionOptions = [
    `{T:name} blinks at you, {T:his} full lips pouting slightly before curving into a grin.`,
    `{T:name} tilts {T:his} head, {T:his} round ass shifting as {T:he} smiles dumbly.`,
    `{T:name} absently plays with a strand of {T:his} long {T:body.hairColor} hair.`,
    `{T:name} grins and twirls a strand of {T:body.hairColor} hair around {T:his} finger.`];
  const dialogOptions = [
    `Hehe, okay {T:niceName}. I love feeling all filled up and stuff.`,
    `Umm, sure! That sounds fun.`];

  if (player.hasNormalCock()) {
    dialogOptions.push(`Um, okay! If it's your {cock}, I guess I'm in. Or umm... it's in!`)
    dialogOptions.push(`Um, sure. You wanna feel my tight little holes around your cock, don't you {T:niceName}?`);
  }

  if (partner.breastsAreAtLeast('big')) {
    dialogOptions.push(`Um, okay. Did you want to feel how heavy my boobs are?`);
  }

  if (partner.isEquipped('chest')) {
    motionOptions.push(`The bimbo nods slowly, {T:his} vacant eyes glazing over as {T:he}
      adjusts {T:his} top, "accidentally" exposing one of {T:his} {T:breasts:thickNipples}.`);
  }

  if (partner.hasSexualPreference('anal-slut',30) && partner.isAnusEmpty()) {
    dialogOptions.push(`Um sure... do you think you could put something like... in my butt.`);}

  return `${Random.from(motionOptions)} "${Random.from(dialogOptions)}"`;
});

Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Reluctant, context => {
  const player = Character(context.P);
  const partner = Character(context.T);

  const motionOptions = [
    `{T:name} shifts uncomfortably, looking you over with a blank expression.`,
    `{T:name} tilts {T:his} head, looking a little confused.`,
    `{T:name} glances away shyly, pretending to be interested in something off in the distance.`,
    `The bimbo hesitates, biting {T:his} lip as {T:his} cheeks flush.`];

  const dialogOptions = [
    `Umm... I don't wanna mess it up, but okay. If you really want to.`,
    `Umm... I dunno, my pussy's a little scared.`,
    `I guess? I mean... it's kind of a lot. But okay, sure.`,
    `Training? Umm but... Aren't I good at it already?`,
    `Umm... sure. But be careful with my titties okay?`];

  if (partner.breastsAreAtLeast('big')) {
    dialogOptions.push(`You really like my boobies a lot huh? Okay... you can play with them for a little while.`);
  }

  if (partner.hasSexualPreference('anal-slut',30) && partner.isAnusEmpty()) {
    dialogOptions.push(`Hmm... okay. But only because my butthole feels so empty right now.`);}

  if (partner.hasSexualPreference('cock-lover',20) && player.hasNormalCock()) {
    dialogOptions.push(`Well... your cock does look yummy...`); }

  if (partner.hasNormalCock()) {
    dialogOptions.push(`Umm... it's a little messy though right? Like when you make me 
      spray cum everywhere. And then I'm the one who has to clean it all up.`); }

  if (partner.hasNormalCock() && player.cockIsAtLeast('big')) {
    dialogOptions.push(`Umm... maybe? I mean, my cock wants some, but my little pussy's scared.`); }

  if (partner.hasNormalCock() && partner.isCrotchExposed()) {
    motionOptions.push(`{T:name} reaches down, wrapping {T:his} hand around {T:his} 
      {T:cock.thickSixInchLongCock}, giving it a firm squeeze.`)
  }
  if (partner.areBreastsExposed()) {
    motionOptions.push(`{T:name} shrugs, reaching up to cup {T:his} {T:breasts.bigRoundBreasts}, 
      giving {T:his} {T:breasts.thickNipples} a gentle pull.` )
  }

  return `${Random.from(motionOptions)} "${Random.from(dialogOptions)}"`;
});

Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Unwilling, context => {
  const player = Character(context.P);
  const partner = Character(context.T);

  const motionOptions = [
    `{T:name} tilts {T:his} head, {T:his} plump lips forming a frown.`,
    `{T:name} sticks {T:his} tongue out at you, {T:his} ass jiggling as {T:he} turns away.`,
    `{T:name} pouts and shakes {T:his} head.`];
  const dialogOptions = [
    `Nope. Not with you. My pussy doesn't wanna.`,
    `No, I don't wanna. I've got like, a headache or something.`];

  if (partner.breastsAreAtLeast('big')) {
    motionOptions.push(`{T:name} crosses {T:his} arms under {T:his} {T:breasts:bigBreasts}, 
      pushing them up as though daring you to try something.`);
    motionOptions.push(`The bimbo shakes {T:his} head, {T:his} {T:breasts:bigBreasts} 
      swinging back and forth hypnotically.`);
  }

  if (partner.hasNormalCock() && partner.isCrotchExposed()) {
    motionOptions.push(`{T:name} shakes {T:his} head, {T:his} {cock} hanging limp between {T:his} legs.`); }

  if (player.cockIsAtLeast('huge')) {
    dialogOptions.push(`You're too big. Like, find someone else to stretch out.`); }

  return `${Random.from(motionOptions)} "${Random.from(dialogOptions)}"`;
});
