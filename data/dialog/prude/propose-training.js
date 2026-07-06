
// The prude archetype is child of the serious archetype but with more animosity towards sex. The prudes are
// uninterested in anything sexual. They're cold, unfeeling, frigid, angry. They can be any gender. It should be
// possible, through training to cause a character to lose this archetype. Rather than having their personality
// reverting back to serious, I think we'll also eventually need an ex-prude archetype.

const eager = WeaverPackage('prude.propose-training.eager');
const willing = WeaverPackage('prude.propose-training.willing');
const reluctant = WeaverPackage('prude.propose-training.reluctant');
const unwilling = WeaverPackage('prude.propose-training.unwilling');

Dialog.register(ArchetypeCode.prude, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.prude, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.prude, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.prude, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} stiffens, then exhales slowly. "...Fine. That is my purpose here I suppose."`);



willing.add(`{T:name} crosses {T:his} arms and looks away. "I suppose if it must happen, then it must.
  Just don't expect me to like it."`);



reluctant.add(`{T:name}'s expression tightens with visible distaste. "What a deeply uncomfortable thing to ask
  of someone... Fine. Let's just... get it over with."`);



unwilling.add(`{T:name} fixes you with a cold stare. "No. Absolutely not."`);
