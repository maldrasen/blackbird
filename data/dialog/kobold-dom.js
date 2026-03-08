
Dialog.register(Architype.koboldDom, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} bares {T:his} teeth in a sharp grin. "Training? You want {T:name} to train you? 
    Ha! Fine. Then this one will show you no mercy."`;
});

Dialog.register(Architype.koboldDom, DialogKeys.proposeTraining_Willing, context => {
  return  `{T:name} clicks {T:his} claws together, sizing you up. "Training? You mean sex yes?"`;
});

Dialog.register(Architype.koboldDom, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} snorts a puff of hot air. "You have a lot to learn 
    {P:species.name}. Kobolds never ask. We just take."`;
});

Dialog.register(Architype.koboldDom, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} snarls, the spines on his head rising. "Try it {P:species.name}, and see what happens."`;
});
