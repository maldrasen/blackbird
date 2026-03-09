
// The reserved characters have no strong personality in any direction, they are unemotional, stoic, and don't talk a
// lot.

Dialog.register(ArchitypeCode.reserved, DialogKeys.proposeTraining_Eager, context => {
  const options = [
    `{T:name} pauses, then nods once. "Yes. I'm ready when you are."`];
  return Random.from(options);
});

Dialog.register(ArchitypeCode.reserved, DialogKeys.proposeTraining_Willing, context => {
  const options = [
    `{T:name} considers for a moment before answering. "Alright. I don't have any objections."`];
  return Random.from(options);
});

Dialog.register(ArchitypeCode.reserved, DialogKeys.proposeTraining_Reluctant, context => {
  const options = [
    `{T:name} is quiet for a beat. "Well... I'm not opposed. I just need a moment."`];
  return Random.from(options);
});

Dialog.register(ArchitypeCode.reserved, DialogKeys.proposeTraining_Unwilling, context => {
  const options = [
    `{T:name} shakes {T:his} head without any particular emotion. "No. I would prefer not to."`];
  return Random.from(options);
});


// "…Understood. Proceed whenever you're ready."
// "I have no objections. You may begin the session."
// "…Interesting proposal. I accept. Let's see what you can do."
// proposeTraining_Willing
// "…Very well. I will cooperate."
// "If that's what you desire, then yes."
// "I see no reason to refuse. Go ahead."
// proposeTraining_Reluctant
// "…This is somewhat outside my comfort zone."
// "I would prefer not to, but… I suppose I can endure it."
// "…Must we involve additional participants? …Fine. But keep them quiet."
// proposeTraining_Unwilling
// "No. I decline."
// "That crosses a line I'm not willing to cross."
// "I will not participate in that. End of discussion."
