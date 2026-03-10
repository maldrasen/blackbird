
// The bitch archetype is the female equivalent of bastard. Bitches are always sadists or debasers, but never bottoms.

Dialog.register(ArchetypeCode.bitch, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} looks you up and down, then smirks. "Fine. But you better leave me satisfied."`;
});

Dialog.register(ArchetypeCode.bitch, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} heaves a dramatic sigh. "Training? Is that what you call it? Whatever, just try not to bore me."`;
});

Dialog.register(ArchetypeCode.bitch, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} narrows {T:his} eyes. "You think I'd just agree to let you touch me like that?"`;
});

Dialog.register(ArchetypeCode.bitch, DialogKeys.proposeTraining_Unwilling, context => {
  return  `{T:name} gives you a withering look. "Of course not. It's insulting that you even asked."`;
});
