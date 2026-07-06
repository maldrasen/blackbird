
// Slut characters love sex and is up for anything with anyone. Slut is a bit of a double edged sword though. While
// they'll consent to most sex actions with the player, they're also likely to fuck anyone who asks. Players who care
// about NTR should probably avoid them.

const eager = WeaverPackage('slut.propose-training.eager');
const willing = WeaverPackage('slut.propose-training.willing');
const reluctant = WeaverPackage('slut.propose-training.reluctant');
const unwilling = WeaverPackage('slut.propose-training.unwilling');

Dialog.register(ArchetypeCode.slut, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.slut, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.slut, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.slut, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} licks {T:his} lips and is already moving toward you before you finish speaking. "Fuck yes. Let go."`);



// TODO: We want a version where they're thrusting their tits or cock out.
willing.add(`{T:name} smiles lazily and stretches. "Sure, I've got nothing better going on."`);



reluctant.add(`{T:name} raises an eyebrow. "I guess. It's not like I'm going to say no."`);



unwilling.add(`{T:name} gives you a flat look. "Mmm... nope. Not interested. Find someone else."`);
