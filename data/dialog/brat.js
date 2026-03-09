
// Brats are playful, disobedient, and insulting. Brats can be any gender though if they're male they'll lean into the
// pratty femboy persona.

Dialog.register(ArchitypeCode.brat, DialogKeys.proposeTraining_Eager, context => {
  const options = [
    `{T:name} crosses {T:his} arms and smirks. "Training? Fine. But I'm not making it easy on you."`,
    `{T:name} heaves an overly dramatic sigh, "...Fine. But don't assume this means anything special."`];

  return Random.from(options);
});

Dialog.register(ArchitypeCode.brat, DialogKeys.proposeTraining_Willing, context => {
  const options = [
    `{T:name} shrugs with exaggerated indifference. "Whatever, sure. Just don't expect me to do all the work."`,
    `"Train me? Tch, whatever." {T:name} rolls {T:his} eyes but nods. "Just don't screw it up."`,
    `{T:name} smirks faintly. "Fine, but if you suck at it, I'm out. Make it worth my time, pervert."`];

  options.push(`{T:name} tilts {T:his} head to the side, "You're really into this 
    training stuff, huh? Well, whatever. Just don't make it weird."`);
  options.push(`{T:name} blinks in surprise, "Wh-what kind of pervert asks so casually...
    Tch. Whatever. Just get it over with before I change my mind."`);

  return Random.from(options);
});

Dialog.register(ArchitypeCode.brat, DialogKeys.proposeTraining_Reluctant, context => {
  const options = [
    `{T:name} snorts. "Wow, really? You've got some nerve asking. Maybe you'll just have to make me."`,
    `{T:name's} eyes widen. "You're seriously asking me that? Fine, just... be quick about it."`,
    `{T:name} averts {T:his} gaze, fidgeting. "I-idiot, why would I want that? ...But maybe, if you beg."`];

  options.push(`"Training? This is so embarrassing..." {T:name} covers {T:his} eyes, 
    shaking {T:his} head. "Ugh, alright, but just a little!"`)

  return Random.from(options);
});

Dialog.register(ArchitypeCode.brat, DialogKeys.proposeTraining_Unwilling, context => {
  const options = [
    `{T:name} rolls {T:his} eyes so hard it looks painful. "With you? Ha! Dream on."`,
    `{T:name} glares, shaking {T:his} head. "Training! You're such a fucking creep. Back off loser!"`,
    `{T:name} glares, shaking {T:his} head. "I'd rather die. Try someone else, fucking creep."`,
    `{T:name} crosses {T:his} arms defiantly. "Training! Fuck off, loser. I'm not your toy."`];
  return Random.from(options);
});


