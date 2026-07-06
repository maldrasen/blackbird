
// Timid characters are passive but also excitable. As such they come across as timid and a bit fearful. Timid
// characters can be any gender.

const eager = WeaverPackage('timid.propose-training.eager');
const willing = WeaverPackage('timid.propose-training.willing');
const reluctant = WeaverPackage('timid.propose-training.reluctant');
const unwilling = WeaverPackage('timid.propose-training.unwilling');

Dialog.register(ArchetypeCode.timid, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.timid, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.timid, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.timid, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} nods quickly, cheeks red. "Y-yes... I'd like that. If it's okay with you..."`);
eager.add(`{T:name} smiles timidly, whispering. "Okay... it sounds nice. Can we go slow?"`);
eager.add(`{T:name} looks startled, then breaks into a sudden, nervous smile. "Oh! Um... yes. Yes, okay.
  Sorry, you just surprised me."`);



willing.add(`"T-train me?" {T:name} stammers, but nods. "I-I'll try... for you."`);
willing.add(`{T:name} flinches slightly, then steadies. "Training? Um... I can do that. Just... be gentle with me."`);



reluctant.add(`{T:name} pulls {T:his} arms in close. "What? I don't... I'm not sure. Can I think about it?"`);
reluctant.add(`{T:name} wrings {T:his} hands, voice small. "I mean... I'm scared... but if you really want..."`);



unwilling.add(`{T:name} shrinks back, shaking {T:his} head quickly. "I'm sorry, please. I just... can't do that."`);
unwilling.add(`{T:name} shakes {T:his} head, eyes wide. "N-no, please... You're scaring me."`);
