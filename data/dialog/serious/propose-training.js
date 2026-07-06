
// The serious characters are more interested in exploring the dungeon than they are in being trained for sex, but they
// know it's part of the arrangement. They're violent when they need to be, and take situations seriously.

const strong = WeaverRequirements.minimumStrength('T', 20);
const taller = WeaverRequirements.isTallerThan('T', 'P');
const bigCock = WeaverRequirements.minimumCockSize('T', 'big');
const legsCovered = WeaverRequirements.legsAreCovered('T');
const bigBreasts = WeaverRequirements.minimumBreastSize('T', 'big');
const chestCovered = WeaverRequirements.chestIsCovered('T');

const eager = WeaverPackage('serious.propose-training.eager');
const willing = WeaverPackage('serious.propose-training.willing');
const reluctant = WeaverPackage('serious.propose-training.reluctant');
const unwilling = WeaverPackage('serious.propose-training.unwilling');

Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} smiles and gives a single, decisive nod. "Alright. Let's not waste time then."`);
eager.add(`{T:name} nods with obvious respect. "You know what you're doing. I'll follow your lead."`);
eager.add(`{T:name} chuckles and meets your gaze, "Okay {T:niceName}, get started whenever you're ready."`);
eager.add(`{T:name} smiles and cracks {T:his} neck, muscles tensing in preparation. "Let's get to it then."`,
  [strong]);
eager.add(`{T:name} smiles and looks down at you with quiet intensity. "I'm ready. Show me what you need."`,
  [taller]);



willing.add(`{T:name} nods firmly. "I know what this is. Let's do it properly."`);
willing.add(`{T:name} meets your gaze evenly. "I can do that. Just tell me what you need."`);
willing.add(`{T:name} takes a steady breath, preparing {T:him}self mentally. "I understand. Let's begin."`);
willing.add(`{T:name} straightens, the outline of {T:his} {T:cock.bigCock} straining against {T:his} {T:equipped.legs}.
  "Understood. I'm prepared for whatever comes next."`,
  [bigCock, legsCovered]);
willing.add(`{T:name} straightens, the outline of {T:his} {T:breasts.bigSoftBreasts} straining against {T:his}
  {T:equipped.chest}. "Understood. I'm prepared for whatever comes next."`,
  [bigBreasts, chestCovered]);
willing.add(`{T:name} nods and begins to pull off {T:his} {T:equipped.chest}. {unequip(T,chest)} "Alright,
  let's get going then."`,
  [chestCovered]);



reluctant.add(`{T:name} exhales slowly, "Fine, if that's what you require of me."`);
reluctant.add(`{T:name}'s jaw tightens, "Fine... It's not like I have much choice."`);
reluctant.add(`{T:name}'s jaw tightens slightly. "Hmm, well. If you think it's absolutely necessary."`);
reluctant.add(`{T:name} grimaces but nods. "Hmm, I can't say I care for the idea, but I'll comply. Get on with it."`);
reluctant.add(`{T:name} takes a moment, clearly wrestling with the decision. {T:He} finally gives you a slow nod.
  "Fine. Let's be done with it."`);



unwilling.add(`{T:name} steps back, {T:his} voice cold and final. "You lack the authority to demand that of me."`);
unwilling.add(`{T:name} holds up a hand, {T:his} voice flat. "No. That's my final answer."`);
unwilling.add(`{T:name} turns away, {T:his} shoulders rigid. "This conversation is over. The answer is no."`);
unwilling.add(`{T:name} meets your gaze without wavering. "No, and don't ask me again."`);
