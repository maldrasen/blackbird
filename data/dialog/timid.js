
// Timid characters are passive but also excitable. As such they come across as timid and a bit fearful. Timid
// characters can be any gender.

Dialog.register(Architype.timid, DialogKeys.proposeTraining_Eager, context => {
  const options = [
    `{T:name} nods quickly, cheeks red. "Y-yes... I'd like that. If it's okay with you..."`,
    `{T:name} smiles timidly, whispering. "Okay... it sounds nice. Can we go slow?"`];

  options.push(`{T:name} looks startled, then breaks into a sudden, nervous smile.
    "Oh! Um... yes. Yes, okay. Sorry, you just surprised me."`);

  return Random.from(options);
});

Dialog.register(Architype.timid, DialogKeys.proposeTraining_Willing, context => {
  const options = [`"T-train me?" {T:name} stammers, but nods. "I-I'll try... for you."`];

  options.push(`{T:name} flinches slightly, then steadies. "Training? Um... 
    I can do that. Just... be gentle with me."`);

  return Random.from(options);
});

Dialog.register(Architype.timid, DialogKeys.proposeTraining_Reluctant, context => {
  const options = [
    `{T:name} pulls {T:his} arms in close. "What? I don't... I'm not sure. Can I think about it?"`,
    `{T:name} wrings {T:his} hands, voice small. "I mean... I'm scared... but if you really want..."`];
  return Random.from(options);
});

Dialog.register(Architype.timid, DialogKeys.proposeTraining_Unwilling, context => {
  const options = [
    `{T:name} shrinks back, shaking {T:his} head quickly. "I'm sorry, please. I just... can't do that."`,
    `{T:name} shakes {T:his} head, eyes wide. "N-no, please... You're scaring me."`];
  return Random.from(options);
});
