
// The heartless are violent, cruel, insulting, hateful. We might want to add some monitoring either to this
// personality or to the sexual preferences to ensure that we don't get heartless submissives. A heartless character
// can be any gender.

Dialog.register(ArchitypeCode.heartless, DialogKeys.proposeTraining_Eager, context => {
  const options = []

  options.push(`{T:name} looks you over with cold amusement. "Oh? You 
    want to play? Fine. Just know I won't go easy on you."`)
  options.push(`{T:name} smirks, {T:his} chin raised high. "You think you can train someone like me?
    Heh, fine. But just so you know, I'm only saying yes so I can watch you fail spectacularly."`);
  options.push(`{T:name} laughs once, sharp and confident. "Do whatever you like. 
    It won't change the fact that I'm still the one in control here."`);

  return Random.from(options);
});

Dialog.register(ArchitypeCode.heartless, DialogKeys.proposeTraining_Willing, context => {
  const options = [
    `{T:name} shrugs, clearly unimpressed. "If it'll shut you up, then sure. Let's see what you've got."`,
    `{T:name} crosses {T:his} arms. "Training? Fine. As long as I get what I want from it."`,
    `{T:name} flicks {T:his} hair back and looks you over. "Fine. But don't expect a cuddle afterwards."`,
    `"Training?" {T:name} shrugs. "Sure. It's not like I have anything better to do."`];

  return Random.from(options);
});

Dialog.register(ArchitypeCode.heartless, DialogKeys.proposeTraining_Reluctant, context => {
  const options = [];

  options.push(`{T:name} regards you with barely concealed contempt. "Oh? I might let 
    you, if you can convince me it's worth my time."`);
  options.push(`{T:name} exhales sharply through {T:his} nose. "You know I hate
    you right? Fine, whatever. I enjoy a hate fuck now and then."`);

  return Random.from(options);
});

Dialog.register(ArchitypeCode.heartless, DialogKeys.proposeTraining_Unwilling, context => {
  const options = [
    `{T:name} scoffs loudly and turns away. "You must be joking. Submitting to you? Never."`,
    `{T:name} glares over {T:his} shoulder. "No. And if you ask again I'll make you regret it."`,
    `{T:name} laughs, short and sharp. "You? Seriously? Get out of my sight."`];

  return Random.from(options);
});
