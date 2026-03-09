
// Slut characters love sex and is up for anything with anyone. Slut is a bit of a double edged sword though. While
// they'll consent to most sex actions with the player, they're also likely to fuck anyone who asks. Players who care
// about NTR should probably avoid them.

Dialog.register(ArchetypeCode.slut, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} licks {T:his} lips and is already moving toward you before 
    you finish speaking. "Fuck yes. Let go."`;
});

// TODO: We want a version where they're thrusting their tits or cock out.
Dialog.register(ArchetypeCode.slut, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} smiles lazily and stretches. "Sure, I've got nothing better going on.`;
});

Dialog.register(ArchetypeCode.slut, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} raises an eyebrow. "I guess. It's not like I'm going to say no."`; });
Dialog.register(ArchetypeCode.slut, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} gives you a flat look. "Mmm... nope. Not interested. Find someone else."`; });
