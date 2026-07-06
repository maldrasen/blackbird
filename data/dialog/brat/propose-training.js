
// Brats are playful, disobedient, and insulting. Brats can be any gender though if they're male they'll lean into the
// pratty femboy persona.

const eager = WeaverPackage('brat.propose-training.eager');
const willing = WeaverPackage('brat.propose-training.willing');
const reluctant = WeaverPackage('brat.propose-training.reluctant');
const unwilling = WeaverPackage('brat.propose-training.unwilling');

Dialog.register(ArchetypeCode.brat, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.brat, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.brat, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.brat, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} crosses {T:his} arms and smirks. "Training? Fine. But I'm not making it easy on you."`);
eager.add(`{T:name} heaves an overly dramatic sigh, "...Fine. But don't assume this means anything special."`);



willing.add(`{T:name} shrugs with exaggerated indifference. "Whatever, sure. Just don't expect me to do all the work."`);
willing.add(`"Train me? Tch, whatever." {T:name} rolls {T:his} eyes but nods. "Just don't screw it up."`);
willing.add(`{T:name} smirks faintly. "Fine, but if you suck at it, I'm out. Make it worth my time, pervert."`);
willing.add(`{T:name} tilts {T:his} head to the side, "You're really into this training stuff, huh? Well, whatever.
  Just don't make it weird."`);
willing.add(`{T:name} blinks in surprise, "Wh-what kind of pervert asks so casually... Tch. Whatever. Just get it
  over with before I change my mind."`);



reluctant.add(`{T:name} snorts. "Wow, really? You've got some nerve asking. Maybe you'll just have to make me."`);
reluctant.add(`{T:name's} eyes widen. "You're seriously asking me that? Fine, just... be quick about it."`);
reluctant.add(`{T:name} averts {T:his} gaze, fidgeting. "I-idiot, why would I want that? ...But maybe, if you beg."`);
reluctant.add(`"Training? This is so embarrassing..." {T:name} covers {T:his} eyes, shaking {T:his} head.
  "Ugh, alright, but just a little!"`);



unwilling.add(`{T:name} rolls {T:his} eyes so hard it looks painful. "With you? Ha! Dream on."`);
unwilling.add(`{T:name} glares, shaking {T:his} head. "Training! You're such a fucking creep. Back off loser!"`);
unwilling.add(`{T:name} glares, shaking {T:his} head. "I'd rather die. Try someone else, fucking creep."`);
unwilling.add(`{T:name} crosses {T:his} arms defiantly. "Training! Fuck off, loser. I'm not your toy."`);
