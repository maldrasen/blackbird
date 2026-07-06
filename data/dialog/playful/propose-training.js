
// The playful archetype is excitable, curious, and fun loving,

const eager = WeaverPackage('playful.propose-training.eager');
const willing = WeaverPackage('playful.propose-training.willing');
const reluctant = WeaverPackage('playful.propose-training.reluctant');
const unwilling = WeaverPackage('playful.propose-training.unwilling');

Dialog.register(ArchetypeCode.playful, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.playful, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.playful, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.playful, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} laughs and bends over a little in front of you, wiggling {T:his} ass invitingly.
  "Finally! Come and take it {P:insultingName}."`);
eager.add(`{T:name} twirls a lock of hair around {T:his} finger and winks. "Mmm hmm! Bring the toys, bring your
  friends, bring everything. I'm ready."`);



willing.add(`{T:name} taps {T:his} chin with one finger, pretending to think it over. "Hmm... okay, sure, let's do it."`);
willing.add(`{T:name} sticks out {T:his} tongue playfully before licking {T:his} lips seductively. "Okay boss.
  What kind of naughty shit are we starting with today?"`);



reluctant.add(`{T:name} twirls once then stops, looking at you sideways. "Fine... This better not be boring though."`);
reluctant.add(`{T:name} squints at you with a lopsided grin. "You're serious? Alright, but you owe me one."`);



unwilling.add(`{T:name} sticks out {T:his} tongue. "Nope! Not happening. Ask again maybe sometime never."`);
unwilling.add(`{T:name} rolls {T:his} eyes so hard that {T:his} whole head tilts back. "Seriously? Maybe if you
  were good looking, but unfortunately..."`);
