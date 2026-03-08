
// Sweet characters are kind and gentle. Like bitch though, sweet characters end up with this personality archetype
// because they didn't have anything interesting to really differentiate them. Because of the way the personalities are
// build, most women are going to end up with the sweet personality archetype. As such we should do what we can to add
// variety to this archetype or find other variables that can be used to differentiate the sweet characters.

Dialog.register(Architype.sweet, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} smiles warmly and takes your hand. "Of course. I really just 
    want to make you happy. Whatever you need."`;
});

Dialog.register(Architype.sweet, DialogKeys.proposeTraining_Willing, context => {
  return `"You want to... train me?" {T:name} nods gently. "Okay. I'll try my best."`;
});

Dialog.register(Architype.sweet, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} looks down at {T:his} hands. "I want to say yes for your sake, 
    but... I'm a little scared."`;
});

Dialog.register(Architype.sweet, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} shakes {T:his} head, {T:his} voice quiet but firm. "I'm sorry, 
    I'm just not ready for that yet. Please don't be upset with me."`;
});
