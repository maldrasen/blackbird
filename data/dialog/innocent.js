
// This archetype is based entirely around the character's sexual history. They're timid and inexperienced, and have
// no strong sexual preferences.

Dialog.register(Architype.innocent, DialogKeys.proposeTraining_Eager, context => {
  return  `{T:name} looks up at you with wide frightened eyes, "I... okay. I 
    trust you. Just... be gentle with me?"`;
});

Dialog.register(Architype.innocent, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} hesitates, cheeks flushing pink. "I've never really... but 
    if you think it's okay, then... alright."`;
});

Dialog.register(Architype.innocent, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} wrings {T:his} hands, avoiding your gaze. "Training? I don't 
    know if I'm ready for something like that..."`;
});

Dialog.register(Architype.innocent, DialogKeys.proposeTraining_Unwilling, context => {
  return `"Training?" {T:name} takes a small step back, {T:his} eyes wide. "No, 
    I... I really don't think I can do something like that."`;
});
