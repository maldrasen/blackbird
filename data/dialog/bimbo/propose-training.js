// Bimbos love sex and are kind of stupid. We'll eventually have a personality monitoring system to ensure that bimbo
// characters never get too smart. Bimbos will also always be females or futas so we know they at least have tits,
// though not always necessarily large tits.

const pHasCock = WeaverRequirements.hasCock('P');
const pBigCock = WeaverRequirements.minimumCockSize('P', 'big');
const pHugeCock = WeaverRequirements.minimumCockSize('P', 'huge');

const tHasCock = WeaverRequirements.hasCock('T');
const tVisibleCock = WeaverRequirements.visibleCock('T');
const tVisibleAnus = WeaverRequirements.visibleAnus('T');
const tBigBreasts = WeaverRequirements.minimumBreastSize('T', 'big');
const tHugeBreasts = WeaverRequirements.minimumBreastSize('T', 'huge');
const tBreastsVisible = WeaverRequirements.visibleBreasts('T');
const tConsentsTitfuck = WeaverRequirements.wouldConsentTo('T', 'get-titfuck', Consent.willing);
const tConsentsBlowjob = WeaverRequirements.wouldConsentTo('T', 'get-blowjob', Consent.willing);
const tConsentsRimming = WeaverRequirements.wouldConsentTo('T', 'get-rimming', Consent.willing);
const tConsentsAnal = WeaverRequirements.wouldConsentTo('T', 'fuck-anus', Consent.willing);
const tAnalSlut = WeaverRequirements.hasSexualPreference('T', 'anal-slut', 30);
const tAnusEmpty = WeaverRequirements.isAnusEmpty('T');
const tCockLover = WeaverRequirements.hasSexualPreference('T', 'cock-lover', 20);
const tChestEquipped = WeaverRequirements.chestIsCovered('T');

const eager = WeaverPackage('bimbo.propose-training.eager');
const willing = WeaverPackage('bimbo.propose-training.willing');
const reluctant = WeaverPackage('bimbo.propose-training.reluctant');
const unwilling = WeaverPackage('bimbo.propose-training.unwilling');

eager.defineFormat(`{{motion}} "{{dialogue}}"`,500);
willing.defineFormat(`{{motion}} "{{dialogue}}"`,500);
reluctant.defineFormat(`{{motion}} "{{dialogue}}"`,500);
unwilling.defineFormat(`{{motion}} "{{dialogue}}"`,500);

Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Unwilling, unwilling);

// The eager dialog also has a couple of rare full-line moments that replace the motion+dialogue combo entirely. Their
// low weight against the format above leaves them about a one-in-six chance when their requirements are met.
eager.add(`{T:name} grins widely and grabs {T:his} {T:breasts.bigRoundBreasts}, squeezing them together roughly, "Mmm, yes! I want you to fuck my titties really hard this time."`,
  [pHasCock, tHugeBreasts, tBreastsVisible, tConsentsTitfuck]);
eager.add(`{setPosition(kneeling-dominant)} {T:name} grins and drops to {T:his} knees. {T:He} opens his mouth wide and says, "Ahhh...."`,
  [pHasCock, tCockLover, tConsentsBlowjob]);
eager.add(`{setPosition(standing-reversed)} {T:name} grins broadly and turns around, bending over and reaching behind to spread {T:his} ass cheeks wide apart. "Mmmm, yes. Guess where I want it?"`,
  [tVisibleAnus, tAnalSlut, tConsentsAnal]);

eager.addPart('motion', `{T:name} bounces on {T:his} heels, eyes lighting up with excitement.`);
eager.addPart('motion', `{T:name} twirls a lock of {T:his} hair around a finger while giggling.`);
eager.addPart('motion', `{T:name's} eyes widen with delight as {T:he} starts to rubs {T:his} thighs together.`);
eager.addPart('motion', `{T:name} bounces in place, {T:his} {T:breasts.bigBreasts} bouncing enticingly.`,
  [tBigBreasts]);
eager.addPart('motion', `The bimbo claps {T:his} hands excitedly, {T:his} {T:breasts.bigBreasts} bouncing wildly.`,
  [tBigBreasts]);
eager.addPart('motion', `{T:name} skips closer, {T:his} ample cleavage heaving with each step.`,
  [tBigBreasts]);
eager.addPart('motion', `{T:name} presses {T:his} soft body against you, pushing your arm between {T:his} {T:breasts.bigSoftBreasts}.`,
  [tBigBreasts]);
eager.addPart('motion', `{T:name} grins and bounces on {T:his} heels, {T:his} {T:breasts.bigRound} tits bouncing while {T:his} {T:cock.thickSixInchLongCock} swings heavily between {T:his} thighs.`,
  [tVisibleCock]);
eager.addPart('motion', `{T:name} grins and presses {T:his} body against you, letting {T:his} {T:cock.thickSixInchLongCock} press firmly against your leg.`,
  [tVisibleCock]);

eager.addPart('dialogue', `Time to make me cum again? Okay {T:niceName}.`);
eager.addPart('dialogue', `Please {T:niceName}, my little butthole feels so empty right now.`,
  [tAnalSlut, tAnusEmpty]);
eager.addPart('dialogue', `Oh yes, I need something really thick in my ass {T:niceName}.`,
  [tAnalSlut, tAnusEmpty]);
eager.addPart('dialogue', `Yes {T:niceName}, I can't wait to feel your {P:cock.bigCock} stretching me open.`,
  [pBigCock]);
eager.addPart('dialogue', `Hehehe. {T:niceName} needs {P:his} {cock} sucked again?`,
  [pHasCock, tConsentsBlowjob]);
eager.addPart('dialogue', `Ohmygod, yes! I wanna be your favorite little cock sucker!`,
  [pHasCock, tConsentsBlowjob]);
eager.addPart('dialogue', `Hehe. Sure thing {T:niceName}. You can make me lick your butthole if you want to.`,
  [tConsentsRimming]);
eager.addPart('dialogue', `Ohmygod, yes {T:niceName}! I wanna be your favorite cum-spraying little slut!`,
  [tHasCock]);

willing.addPart('motion', `{T:name} blinks at you, {T:his} full lips pouting slightly before curving into a grin.`);
willing.addPart('motion', `{T:name} tilts {T:his} head, {T:his} round ass shifting as {T:he} smiles dumbly.`);
willing.addPart('motion', `{T:name} absently plays with a strand of {T:his} long {T:body.hairColor} hair.`);
willing.addPart('motion', `{T:name} grins and twirls a strand of {T:body.hairColor} hair around {T:his} finger.`);
willing.addPart('motion', `The bimbo nods slowly, {T:his} vacant eyes glazing over as {T:he} adjusts {T:his} top, "accidentally" exposing one of {T:his} {T:breasts:thickNipples}.`,
  [tChestEquipped]);

willing.addPart('dialogue', `Hehe, okay {T:niceName}. I love feeling all filled up and stuff.`);
willing.addPart('dialogue', `Umm, sure! That sounds fun.`);
willing.addPart('dialogue', `Um, okay! If it's your {cock}, I guess I'm in. Or umm... it's in!`,
  [pHasCock]);
willing.addPart('dialogue', `Um, sure. You wanna feel my tight little holes around your cock, don't you {T:niceName}?`,
  [pHasCock]);
willing.addPart('dialogue', `Um, okay. Did you want to feel how heavy my boobs are?`,
  [tBigBreasts]);
willing.addPart('dialogue', `Um sure... do you think you could put something like... in my butt.`,
  [tAnalSlut, tAnusEmpty]);

reluctant.addPart('motion', `{T:name} shifts uncomfortably, looking you over with a blank expression.`);
reluctant.addPart('motion', `{T:name} tilts {T:his} head, looking a little confused.`);
reluctant.addPart('motion', `{T:name} glances away shyly, pretending to be interested in something off in the distance.`);
reluctant.addPart('motion', `The bimbo hesitates, biting {T:his} lip as {T:his} cheeks flush.`);
reluctant.addPart('motion', `{T:name} reaches down, wrapping {T:his} hand around {T:his} {T:cock.thickSixInchLongCock}, giving it a firm squeeze.`,
  [tVisibleCock]);
reluctant.addPart('motion', `{T:name} shrugs, reaching up to cup {T:his} {T:breasts.bigRoundBreasts}, giving {T:his} {T:breasts.thickNipples} a gentle pull.`,
  [tBreastsVisible]);

reluctant.addPart('dialogue', `Umm... I don't wanna mess it up, but okay. If you really want to.`);
reluctant.addPart('dialogue', `Umm... I dunno, my pussy's a little scared.`);
reluctant.addPart('dialogue', `I guess? I mean... it's kind of a lot. But okay, sure.`);
reluctant.addPart('dialogue', `Training? Umm but... Aren't I good at it already?`);
reluctant.addPart('dialogue', `Umm... sure. But be careful with my titties okay?`);
reluctant.addPart('dialogue', `You really like my boobies a lot huh? Okay... you can play with them for a little while.`,
  [tBigBreasts]);
reluctant.addPart('dialogue', `Hmm... okay. But only because my butthole feels so empty right now.`,
  [tAnalSlut, tAnusEmpty]);
reluctant.addPart('dialogue', `Well... your cock does look yummy...`,
  [tCockLover, pHasCock]);
reluctant.addPart('dialogue', `Umm... it's a little messy though right? Like when you make me spray cum everywhere. And then I'm the one who has to clean it all up.`,
  [tHasCock]);
reluctant.addPart('dialogue', `Umm... maybe? I mean, my cock wants some, but my little pussy's scared.`,
  [tHasCock, pBigCock]);

unwilling.addPart('motion', `{T:name} tilts {T:his} head, {T:his} plump lips forming a frown.`);
unwilling.addPart('motion', `{T:name} sticks {T:his} tongue out at you, {T:his} ass jiggling as {T:he} turns away.`);
unwilling.addPart('motion', `{T:name} pouts and shakes {T:his} head.`);
unwilling.addPart('motion', `{T:name} crosses {T:his} arms under {T:his} {T:breasts:bigBreasts}, pushing them up as though daring you to try something.`,
  [tBigBreasts]);
unwilling.addPart('motion', `The bimbo shakes {T:his} head, {T:his} {T:breasts:bigBreasts} swinging back and forth hypnotically.`,
  [tBigBreasts]);
unwilling.addPart('motion', `{T:name} shakes {T:his} head, {T:his} {cock} hanging limp between {T:his} legs.`,
  [tVisibleCock]);

unwilling.addPart('dialogue', `Nope. Not with you. My pussy doesn't wanna.`);
unwilling.addPart('dialogue', `No, I don't wanna. I've got like, a headache or something.`);
unwilling.addPart('dialogue', `You're too big. Like, find someone else to stretch out.`,
  [pHugeCock]);
