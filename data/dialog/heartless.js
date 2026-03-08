
// The heartless are violent, cruel, insulting, hateful. We might want to add some monitoring either to this
// personality or to the sexual preferences to ensure that we don't get heartless submissives. A heartless character
// can be any gender.

Dialog.register(Architype.heartless, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} looks you over with cold amusement. "Oh? You want to play? 
    Fine. Just know I won't go easy on you."`;
});

Dialog.register(Architype.heartless, DialogKeys.proposeTraining_Willing, context => {
  return `"Training?" {T:name} shrugs. "Sure. It's not like I have anything better to do."`;
});

Dialog.register(Architype.heartless, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} regards you with barely concealed contempt. "Oh? I might let 
    you, if you can convince me it's worth my time."`
});

Dialog.register(Architype.heartless, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} laughs, short and sharp. "You? Seriously? Get out of my sight."`;
});
