
// Sweet characters are kind and gentle, and perhaps a little mothering. Because of the way the archetypes are
// distributed, a lot of women are going to end up with the sweet personality archetype. As such we should do what we
// can to add variety to this archetype or find other variables that can be used to differentiate the sweet characters.

const eager = WeaverPackage('sweet.propose-training.eager');
const willing = WeaverPackage('sweet.propose-training.willing');
const reluctant = WeaverPackage('sweet.propose-training.reluctant');
const unwilling = WeaverPackage('sweet.propose-training.unwilling');

Dialog.register(ArchetypeCode.sweet, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.sweet, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.sweet, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.sweet, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} smiles warmly and takes your hand. "Of course. I really just want to make you happy.
  Whatever you need."`);
eager.add(`{T:name} blushes softly, eyes sparkling. "Yes, please! I love having the chance to get closer like this."`);
eager.add(`{T:name} smiles and takes hold of your arm, {T:his} {T:breasts.soft} breasts pressing lightly against you.
  "Of course. Anything to see that happy look on your face again."`);
eager.add(`{T:name} wraps {T:his} arms around your waist from behind, cheek resting between your shoulder blades.
  "Mmm... train me however you like. I'm all yours."`);
eager.add(`{T:name} steps closer, resting {T:his} hands on your chest with a warm, knowing smile.
  "Yes {T:niceName}... let me take care of you."`);
eager.add(`{T:name} leans against you, brushing {T:his} {T:breasts.bigSoft} breasts against your arm.
  "Whatever you want {T:niceName}."`);



willing.add(`"You want to... train me?" {T:name} nods gently. "Okay. I'll try my best."`);
willing.add(`{T:name} lowers {T:his} gaze, "If that's what you need from me... then yes, I'll do my best for you."`);
willing.add(`{T:name} reaches out hesitantly and squeezes your hand. "I do enjoy making you feel good, so... yes."`);
willing.add(`{T:name} tilts {T:his} head with a soft smile. "Training? Well... if it makes you smile."`);
willing.add(`{T:name} gives a small, shy nod, {T:his} ass swaying as {T:he} steps closer. "Training... okay.
  Just tell me what feels good for you."`);



reluctant.add(`{T:name} looks down at {T:his} hands. "I want to say yes for your sake, but... I'm a little scared."`);
reluctant.add(`{T:name} bites {T:his} lip, eyes pleading. "Training? I'll try, but promise you'll stop if it hurts?"`);
reluctant.add(`{T:name} bites {T:his} lower lip, glancing away while {T:his} fingers twist together nervously.
  "Okay, but only because it's you asking."`);



unwilling.add(`{T:name} shakes {T:his} head slowly, "No… not yet. Give me a little more time, please?"`);
unwilling.add(`{T:name} whispers softly, trembling. "I can't. It's just... too much right now. Forgive me?"`);
unwilling.add(`{T:name} shakes {T:his} head, {T:his} voice quiet but firm. "I'm sorry, I'm just not ready for that yet.
  Please don't be upset with me."`);
unwilling.add(`{T:name} steps back slightly, eyes downcast. "No, not like this. It feels wrong... maybe we can do
  something else instead?"`);
