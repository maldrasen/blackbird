// Bimbos love sex and are kind of stupid. We'll eventually have a personality monitoring system to ensure that bimbo
// characters never get too smart. Bimbos will also always be females or futas so we know they at least have tits,
// though not always necessarily large tits.

const pHasCock = WeaverRequirements.hasCock('P');
const pBigCock = WeaverRequirements.minimumCockSize('P', 'big');
const pHugeCock = WeaverRequirements.minimumCockSize('P', 'huge');

const tHasCock = WeaverRequirements.hasCock('T');
const tVisibleCock = WeaverRequirements.visibleCock('T');
const tBigBreasts = WeaverRequirements.minimumBreastSize('T', 'big');
const tHugeBreasts = WeaverRequirements.minimumBreastSize('T', 'huge');
const tBreastsVisible = WeaverRequirements.visibleBreasts('T');
const tConsentsTitfuck = WeaverRequirements.wouldConsentTo('T', 'get-titfuck');
const tConsentsBlowjob = WeaverRequirements.wouldConsentTo('T', 'get-blowjob');
const tConsentsRimming = WeaverRequirements.wouldConsentTo('T', 'get-rimming');
const tAnalSlut = WeaverRequirements.hasSexualPreference('T', 'anal-slut', 30);
const tAnusEmpty = WeaverRequirements.isAnusEmpty('T');
const tCockLover = WeaverRequirements.hasSexualPreference('T', 'cock-lover', 20);
const tChestEquipped = WeaverRequirements.chestIsCovered('T');

// Bimbo dialog is built from a motion fragment and a dialogue fragment that are each picked independently, so the
// same handful of authored lines can recombine into a lot of different scenes. This helper joins the two packages
// the way the propose-training episode expects the picked template to look.
function motionAndDialogue(motion, dialogue) {
  return { pick: context => `${motion.pick(context)} "${dialogue.pick(context)}"` };
}

// Eager also has a couple of rare full-line moments that replace the motion+dialogue combo entirely. They're gated
// behind a 1-in-10 roll on top of their own requirements, and fall back to the normal combo if the roll misses or
// nothing currently qualifies.
function motionAndDialogueWithSpecial(special, motion, dialogue) {
  return { pick: context => {
    if (Random.roll(10) < 1) {
      try { return special.pick(context); } catch (err) { /* nothing qualifies right now, fall through */ }
    }
    return `${motion.pick(context)} "${dialogue.pick(context)}"`;
  }};
}



const eagerSpecial = WeaverPackage('bimbo.propose-training.eager.special');
const eagerMotion = WeaverPackage('bimbo.propose-training.eager.motion');
const eagerDialogue = WeaverPackage('bimbo.propose-training.eager.dialogue');

const willingMotion = WeaverPackage('bimbo.propose-training.willing.motion');
const willingDialogue = WeaverPackage('bimbo.propose-training.willing.dialogue');

const reluctantMotion = WeaverPackage('bimbo.propose-training.reluctant.motion');
const reluctantDialogue = WeaverPackage('bimbo.propose-training.reluctant.dialogue');

const unwillingMotion = WeaverPackage('bimbo.propose-training.unwilling.motion');
const unwillingDialogue = WeaverPackage('bimbo.propose-training.unwilling.dialogue');

Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Eager,
  motionAndDialogueWithSpecial(eagerSpecial, eagerMotion, eagerDialogue));
Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Willing,
  motionAndDialogue(willingMotion, willingDialogue));
Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Reluctant,
  motionAndDialogue(reluctantMotion, reluctantDialogue));
Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Unwilling,
  motionAndDialogue(unwillingMotion, unwillingDialogue));



eagerSpecial.add(`{T:name} grins widely and grabs {T:his} {T:breasts.bigRoundBreasts}, squeezing them together
  roughly, "Mmm, yes! I want you to fuck my titties really hard this time."`,
  [pHasCock, tHugeBreasts, tBreastsVisible, tConsentsTitfuck]);
eagerSpecial.add(`{setPosition(kneeling-dominant)} {T:name} grins and drops to {T:his} knees. {T:He} opens his mouth
  wide and says, "Ahhh...."`,
  [pHasCock, tCockLover, tConsentsBlowjob]);



eagerMotion.add(`{T:name} presses {T:his} soft body against you, pushing your arm between {T:his} {T:breasts.bigSoftBreasts}.`);
eagerMotion.add(`{T:name} bounces on {T:his} heels, eyes lighting up with excitement.`);
eagerMotion.add(`{T:name} twirls a lock of {T:his} hair around a finger while giggling.`);
eagerMotion.add(`{T:name's} eyes widen with delight as {T:he} starts to rubs {T:his} thighs together.`);
eagerMotion.add(`{T:name} bounces in place, {T:his} {T:breasts.bigBreasts} bouncing enticingly.`,
  [tBigBreasts]);
eagerMotion.add(`The bimbo claps {T:his} hands excitedly, {T:his} {T:breasts.bigBreasts} bouncing wildly.`,
  [tBigBreasts]);
eagerMotion.add(`{T:name} skips closer, {T:his} ample cleavage heaving with each step.`,
  [tBigBreasts]);
eagerMotion.add(`{T:name} grins and bounces on {T:his} heels, {T:his} {T:breasts.bigRound} tits bouncing while
  {T:his} {T:cock.thickSixInchLongCock} swings heavily between {T:his} thighs.`,
  [tVisibleCock]);
eagerMotion.add(`{T:name} grins and presses {T:his} body against you, letting {T:his} {T:cock.thickSixInchLongCock}
  press firmly against your leg.`,
  [tVisibleCock]);



eagerDialogue.add(`Time to make me cum again? Okay {T:niceName}.`);
eagerDialogue.add(`Please {T:niceName}, my little butthole feels so empty right now.`,
  [tAnalSlut, tAnusEmpty]);
eagerDialogue.add(`Oh yes, I need something really thick in my ass {T:niceName}.`,
  [tAnalSlut, tAnusEmpty]);
eagerDialogue.add(`Yes {T:niceName}, I can't wait to feel your {P:cock.bigCock} stretching me open.`,
  [pBigCock]);
eagerDialogue.add(`Hehehe. {T:niceName} needs {P:his} {cock} sucked again?`,
  [pHasCock, tConsentsBlowjob]);
eagerDialogue.add(`Ohmygod, yes! I wanna be your favorite little cock sucker!`,
  [pHasCock, tConsentsBlowjob]);
eagerDialogue.add(`Hehe. Sure thing {T:niceName}. You can make me lick your butthole if you want to.`,
  [tConsentsRimming]);
eagerDialogue.add(`Ohmygod, yes {T:niceName}! I wanna be your favorite cum-spraying little slut!`,
  [tHasCock]);



willingMotion.add(`{T:name} blinks at you, {T:his} full lips pouting slightly before curving into a grin.`);
willingMotion.add(`{T:name} tilts {T:his} head, {T:his} round ass shifting as {T:he} smiles dumbly.`);
willingMotion.add(`{T:name} absently plays with a strand of {T:his} long {T:body.hairColor} hair.`);
willingMotion.add(`{T:name} grins and twirls a strand of {T:body.hairColor} hair around {T:his} finger.`);
willingMotion.add(`The bimbo nods slowly, {T:his} vacant eyes glazing over as {T:he} adjusts {T:his} top,
  "accidentally" exposing one of {T:his} {T:breasts:thickNipples}.`,
  [tChestEquipped]);



willingDialogue.add(`Hehe, okay {T:niceName}. I love feeling all filled up and stuff.`);
willingDialogue.add(`Umm, sure! That sounds fun.`);
willingDialogue.add(`Um, okay! If it's your {cock}, I guess I'm in. Or umm... it's in!`,
  [pHasCock]);
willingDialogue.add(`Um, sure. You wanna feel my tight little holes around your cock, don't you {T:niceName}?`,
  [pHasCock]);
willingDialogue.add(`Um, okay. Did you want to feel how heavy my boobs are?`,
  [tBigBreasts]);
willingDialogue.add(`Um sure... do you think you could put something like... in my butt.`,
  [tAnalSlut, tAnusEmpty]);



reluctantMotion.add(`{T:name} shifts uncomfortably, looking you over with a blank expression.`);
reluctantMotion.add(`{T:name} tilts {T:his} head, looking a little confused.`);
reluctantMotion.add(`{T:name} glances away shyly, pretending to be interested in something off in the distance.`);
reluctantMotion.add(`The bimbo hesitates, biting {T:his} lip as {T:his} cheeks flush.`);
reluctantMotion.add(`{T:name} reaches down, wrapping {T:his} hand around {T:his} {T:cock.thickSixInchLongCock},
  giving it a firm squeeze.`,
  [tVisibleCock]);
reluctantMotion.add(`{T:name} shrugs, reaching up to cup {T:his} {T:breasts.bigRoundBreasts}, giving {T:his}
  {T:breasts.thickNipples} a gentle pull.`,
  [tBreastsVisible]);



reluctantDialogue.add(`Umm... I don't wanna mess it up, but okay. If you really want to.`);
reluctantDialogue.add(`Umm... I dunno, my pussy's a little scared.`);
reluctantDialogue.add(`I guess? I mean... it's kind of a lot. But okay, sure.`);
reluctantDialogue.add(`Training? Umm but... Aren't I good at it already?`);
reluctantDialogue.add(`Umm... sure. But be careful with my titties okay?`);
reluctantDialogue.add(`You really like my boobies a lot huh? Okay... you can play with them for a little while.`,
  [tBigBreasts]);
reluctantDialogue.add(`Hmm... okay. But only because my butthole feels so empty right now.`,
  [tAnalSlut, tAnusEmpty]);
reluctantDialogue.add(`Well... your cock does look yummy...`,
  [tCockLover, pHasCock]);
reluctantDialogue.add(`Umm... it's a little messy though right? Like when you make me spray cum everywhere.
  And then I'm the one who has to clean it all up.`,
  [tHasCock]);
reluctantDialogue.add(`Umm... maybe? I mean, my cock wants some, but my little pussy's scared.`,
  [tHasCock, pBigCock]);



unwillingMotion.add(`{T:name} tilts {T:his} head, {T:his} plump lips forming a frown.`);
unwillingMotion.add(`{T:name} sticks {T:his} tongue out at you, {T:his} ass jiggling as {T:he} turns away.`);
unwillingMotion.add(`{T:name} pouts and shakes {T:his} head.`);
unwillingMotion.add(`{T:name} crosses {T:his} arms under {T:his} {T:breasts:bigBreasts}, pushing them up as though
  daring you to try something.`,
  [tBigBreasts]);
unwillingMotion.add(`The bimbo shakes {T:his} head, {T:his} {T:breasts:bigBreasts} swinging back and forth
  hypnotically.`,
  [tBigBreasts]);
unwillingMotion.add(`{T:name} shakes {T:his} head, {T:his} {cock} hanging limp between {T:his} legs.`,
  [tVisibleCock]);



unwillingDialogue.add(`Nope. Not with you. My pussy doesn't wanna.`);
unwillingDialogue.add(`No, I don't wanna. I've got like, a headache or something.`);
unwillingDialogue.add(`You're too big. Like, find someone else to stretch out.`,
  [pHugeCock]);
