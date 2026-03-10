
// Innocent characters are timid and inexperienced, and have no strong sexual preferences. This archetype should
// eventually evolve into either the playful archetype, though it depends on how they're trained.

Dialog.register(ArchetypeCode.innocent, DialogKeys.proposeTraining_Eager, context => {
  return  `{T:name} looks up at you with wide frightened eyes, "I... okay. I 
    trust you. Just... be gentle with me?"`;
});

Dialog.register(ArchetypeCode.innocent, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} hesitates, cheeks flushing pink. "I've never really... but 
    if you think it's okay, then... alright."`;
});

Dialog.register(ArchetypeCode.innocent, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} wrings {T:his} hands, avoiding your gaze. "Training? I don't 
    know if I'm ready for something like that..."`;
});

Dialog.register(ArchetypeCode.innocent, DialogKeys.proposeTraining_Unwilling, context => {
  return `"Training?" {T:name} takes a small step back, {T:his} eyes wide. "No, 
    I... I really don't think I can do something like that."`;
});
