
// Kobolds are vicious little bastards. Given that Kobold society is strongly male dominated we can assume that the
// dominant kobolds should all be men. It might be possible to train one into submission, so we'll need to eventually
// write a child archetype for a submissive male kobold. The player gender should also have a strong influence on the
// dialog here as they naturally look down on women.

Dialog.register(ArchetypeCode.koboldDom, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} bares {T:his} teeth in a sharp grin. "Training? You want {T:name} to train you? 
    Ha! Fine. Then this one will show you no mercy."`;
});

Dialog.register(ArchetypeCode.koboldDom, DialogKeys.proposeTraining_Willing, context => {
  return  `{T:name} clicks {T:his} claws together, sizing you up. "Training? You mean sex yes?"`;
});

Dialog.register(ArchetypeCode.koboldDom, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} snorts a puff of hot air. "You have a lot to learn 
    {P:species.name}. Kobolds never ask. We just take."`;
});

Dialog.register(ArchetypeCode.koboldDom, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} snarls, the spines on his head rising. "Try it {P:species.name}, and see what happens."`;
});
