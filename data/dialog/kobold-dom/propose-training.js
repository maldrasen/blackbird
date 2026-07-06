
// Kobolds are vicious little bastards. Given that Kobold society is strongly male dominated we can assume that the
// dominant kobolds will all be men. The player gender should also have a strong influence on the dialog here as they
// naturally look down on women.

const eager = WeaverPackage('kobold-dom.propose-training.eager');
const willing = WeaverPackage('kobold-dom.propose-training.willing');
const reluctant = WeaverPackage('kobold-dom.propose-training.reluctant');
const unwilling = WeaverPackage('kobold-dom.propose-training.unwilling');

Dialog.register(ArchetypeCode.koboldDom, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.koboldDom, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.koboldDom, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.koboldDom, DialogKeys.proposeTraining_Unwilling, unwilling);

eager.add(`{T:name} bares {T:his} teeth in a sharp grin. "Training? You want {T:name} to train you? Ha! Fine.
  Then this one will show you no mercy."`);

willing.add(`{T:name} clicks {T:his} claws together, sizing you up. "Training? You mean sex yes?"`);

reluctant.add(`{T:name} snorts a puff of hot air. "You have a lot to learn {P:species.name}. Kobolds never ask.
  We just take."`);

unwilling.add(`{T:name} snarls, the spines on his head rising. "Try it {P:species.name}, and see what happens."`);
