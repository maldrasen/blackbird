
const eager = WeaverPackage('timid.propose-training.eager');
const willing = WeaverPackage('timid.propose-training.willing');
const reluctant = WeaverPackage('timid.propose-training.reluctant');
const unwilling = WeaverPackage('timid.propose-training.unwilling');
const isKobold = CharacterRequirements.isSpecies('T', 'kobold');

Dialog.register(ArchetypeCode.timid, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.timid, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.timid, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.timid, DialogKeys.proposeTraining_Unwilling, unwilling);

eager.add(`{T:name} nods quickly, cheeks red. "Y-yes... I'd like that. If it's okay with you..."`);
eager.add(`{T:name} smiles timidly, whispering. "Okay... it sounds nice. Can we go slow?"`);
eager.add(`{T:name} looks startled, then breaks into a sudden, nervous smile. "Oh! Um... yes. Yes, okay. Sorry, you just surprised me."`);
eager.add(`{T:name} drops {T:his} gaze immediately, ears flat and tail slowly raising upward. "Of course. Use this one however you want."`,isKobold);

willing.add(`"T-train me?" {T:name} stammers, but nods. "I-I'll try... for you."`);
willing.add(`{T:name} flinches slightly, then steadies. "Training? Um... I can do that. Just... be gentle with me."`);
willing.add(`{T:name} nods briefly before turning around and lifting {T:his} tail.`,isKobold);

reluctant.add(`{T:name} pulls {T:his} arms in close. "What? I don't... I'm not sure. Can I think about it?"`);
reluctant.add(`{T:name} wrings {T:his} hands, voice small. "I mean... I'm scared... but if you really want..."`);
reluctant.add(`{T:name} frowns a little and nods. "If that's what you want from me."`);

unwilling.add(`{T:name} shrinks back, shaking {T:his} head quickly. "I'm sorry, please. I just... can't do that."`);
unwilling.add(`{T:name} shakes {T:his} head, eyes wide. "N-no, please... You're scaring me."`);
unwilling.add(`{T:name} backs against the wall, {T:his} claws scraping against the hard floor. "No... don't hurt me."`,isKobold);
