
// The bitch archetype is the female equivalent of bastard. Bitches are always sadists or debasers, but never bottoms.

const eager = WeaverPackage('bitch.propose-training.eager');
const willing = WeaverPackage('bitch.propose-training.willing');
const reluctant = WeaverPackage('bitch.propose-training.reluctant');
const unwilling = WeaverPackage('bitch.propose-training.unwilling');

Dialog.register(ArchetypeCode.bitch, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.bitch, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.bitch, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.bitch, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} looks you up and down, then smirks. "Fine. But you better leave me satisfied."`);



willing.add(`{T:name} heaves a dramatic sigh. "Training? Is that what you call it? Whatever, just try not to bore me."`);



reluctant.add(`{T:name} narrows {T:his} eyes. "You think I'd just agree to let you touch me like that?"`);



unwilling.add(`{T:name} gives you a withering look. "Of course not. It's insulting that you even asked."`);
