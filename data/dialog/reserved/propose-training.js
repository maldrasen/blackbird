
// The reserved characters have no strong personality in any direction, they are unemotional, stoic, and don't talk a
// lot.

const eager = WeaverPackage('reserved.propose-training.eager');
const willing = WeaverPackage('reserved.propose-training.willing');
const reluctant = WeaverPackage('reserved.propose-training.reluctant');
const unwilling = WeaverPackage('reserved.propose-training.unwilling');

Dialog.register(ArchetypeCode.reserved, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.reserved, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.reserved, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.reserved, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} pauses, then nods once. "Yes. I'm ready when you are."`);



willing.add(`{T:name} considers for a moment before answering. "Alright. I don't have any objections."`);



reluctant.add(`{T:name} is quiet for a beat. "Well... I'm not opposed. I just need a moment."`);



unwilling.add(`{T:name} shakes {T:his} head without any particular emotion. "No. I would prefer not to."`);


// More options to work in later:
// proposeTraining_Eager
// "…Understood. Proceed whenever you're ready."
// "I have no objections. You may begin the session."
// "…Interesting proposal. I accept. Let's see what you can do."
// proposeTraining_Willing
// "…Very well. I will cooperate."
// "If that's what you desire, then yes."
// "I see no reason to refuse. Go ahead."
// proposeTraining_Reluctant
// "…This is somewhat outside my comfort zone."
// "I would prefer not to, but… I suppose I can endure it."
// "…Must we involve additional participants? …Fine. But keep them quiet."
// proposeTraining_Unwilling
// "No. I decline."
// "That crosses a line I'm not willing to cross."
// "I will not participate in that. End of discussion."
