
Dialog.register(Architype.pervert, DialogKeys.proposeTraining_Eager, context => {
  return `TODO: Eager perverted suggestions.`
});

// TODO: Suggestions here too.
Dialog.register(Architype.pervert, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} leans against the wall with a slow grin. "Yeah, I'm in. 
    I've got a few ideas if you want to hear them."`;
});

Dialog.register(Architype.pervert, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} yawns and scratches the back of {T:his} neck. "Ehh sure, 
    just try to make it interesting for me, K?"`;
});

Dialog.register(Architype.pervert, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} looks up and and down before laughing. "Haha, no. I'll 
    happily suck off a horse or whatever. But you? No. Not interested."`;
});
