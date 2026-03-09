
// The prudes are uninterested in sex, cold, unfeeling, frigid, angry. They can be any gender. It should be possible,
// through training to cause a character to lose this aspect. Rather than having their personality change into
// something entirely different, I think we'll also eventually need an ex-prude archetype. Like bimbo and slut
// whatever system we design to monitor personalities should ensure that prudes remain serious (and this should
// actually fall back to serious when necessary)

Dialog.register(ArchetypeCode.prude, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} stiffens, then exhales slowly. "...Fine. That is my purpose here I suppose."`;
});

Dialog.register(ArchetypeCode.prude, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} crosses {T:his} arms and looks away. "I suppose if it must 
    happen, then it must. Just don't expect me to like it."`;
});

Dialog.register(ArchetypeCode.prude, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name}'s expression tightens with visible distaste. "What a deeply uncomfortable 
    thing to ask of someone... Fine. Let's just... get it over with."`;
});

Dialog.register(ArchetypeCode.prude, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} fixes you with a cold stare. "No. Absolutely not."`;
});
