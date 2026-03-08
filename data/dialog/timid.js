
Dialog.register(Architype.timid, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} looks startled, then breaks into a sudden, nervous smile. 
    "Oh! Um... yes. Yes, okay. Sorry, you just surprised me."`;
});

Dialog.register(Architype.timid, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} flinches slightly, then steadies. "Training? Um... 
    I can do that. Just... be gentle with me."`;
});

Dialog.register(Architype.timid, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} pulls {T:his} arms in close. "What? I don't... I'm not sure. 
    Can I think about it?"`;
});

Dialog.register(Architype.timid, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} shrinks back, shaking {T:his} head quickly. "I'm sorry, 
    please. I just... can't do that."`;
});
