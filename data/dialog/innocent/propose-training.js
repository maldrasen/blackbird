
// Innocent characters are timid and inexperienced, and have no strong sexual preferences. This archetype should
// eventually evolve into either the playful archetype, though it depends on how they're trained.

const eager = WeaverPackage('innocent.propose-training.eager');
const willing = WeaverPackage('innocent.propose-training.willing');
const reluctant = WeaverPackage('innocent.propose-training.reluctant');
const unwilling = WeaverPackage('innocent.propose-training.unwilling');

Dialog.register(ArchetypeCode.innocent, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.innocent, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.innocent, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.innocent, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} looks up at you with wide frightened eyes, "I... okay. I trust you. Just... be gentle with me?"`);



willing.add(`{T:name} hesitates, cheeks flushing pink. "I've never really... but if you think it's okay, then... alright."`);



reluctant.add(`{T:name} wrings {T:his} hands, avoiding your gaze. "Training? I don't know if I'm ready for something like that..."`);



unwilling.add(`"Training?" {T:name} takes a small step back, {T:his} eyes wide. "No, I... I really don't think I can do something like that."`);
