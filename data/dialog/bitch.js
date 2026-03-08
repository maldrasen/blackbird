
// The most interesting thing about the bitch archetype is that they're kind of mean. When determining their
// personality archetype, they didn't meet the requirements for any other kind of personality (not violent and no
// strong calm/excitable values) so they kind of ended up here. No men are bitches, they get shunted into the bastard
// personality instead.

Dialog.register(Architype.bitch, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} looks you up and down, then smirks. "Fine. But you better leave me satisfied."`;
});

Dialog.register(Architype.bitch, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} heaves a dramatic sigh. "Training? Is that what you call it? Whatever, just try not to bore me."`;
});

Dialog.register(Architype.bitch, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} narrows {T:his} eyes. "You think I'd just agree to let you touch me like that?"`;
});

Dialog.register(Architype.bitch, DialogKeys.proposeTraining_Unwilling, context => {
  return  `{T:name} gives you a withering look. "Of course not. It's insulting that you even asked."`;
});
