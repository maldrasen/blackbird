
Dialog.register(Architype.prude, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} stiffens, then exhales slowly. "...Fine. That is my purpose here I suppose."`;
});

Dialog.register(Architype.prude, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} crosses {T:his} arms and looks away. "I suppose if it must 
    happen, then it must. Just don't expect me to like it."`;
});

Dialog.register(Architype.prude, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name}'s expression tightens with visible distaste. "What a deeply uncomfortable 
    thing to ask of someone... Fine. Let's just... get it over with."`;
});

Dialog.register(Architype.prude, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} fixes you with a cold stare. "No. Absolutely not."`;
});
