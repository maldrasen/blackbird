
// The playful archetype is excitable, curious, and fun loving,

Dialog.register(ArchetypeCode.playful, DialogKeys.proposeTraining_Eager, context => {
  const options = [];

  options.push(`{T:name} laughs and bends over a little in front of you, wiggling 
    {T:his} ass invitingly. "Finally! Come and take it {P:insultingName}."`)
  options.push(`{T:name} twirls a lock of hair around {T:his} finger and winks. 
    "Mmm hmm! Bring the toys, bring your friends, bring everything. I'm ready."`)

  return Random.from(options);
});

Dialog.register(ArchetypeCode.playful, DialogKeys.proposeTraining_Willing, context => {
  const options = [];

  options.push(`{T:name} taps {T:his} chin with one finger, pretending to
    think it over. "Hmm... okay, sure, let's do it."`)
  options.push(`{T:name} sticks out {T:his} tongue playfully before licking {T:his} lips 
    seductively. "Okay boss. What kind of naughty shit are we starting with today?"`);

  return Random.from(options);
});

Dialog.register(ArchetypeCode.playful, DialogKeys.proposeTraining_Reluctant, context => {
  const options = [
    `{T:name} twirls once then stops, looking at you sideways. "Fine... This better not be boring though."`,
    `{T:name} squints at you with a lopsided grin. "You're serious? Alright, but you owe me one."`];

  return Random.from(options);
});

Dialog.register(ArchetypeCode.playful, DialogKeys.proposeTraining_Unwilling, context => {
  const options = [
    `{T:name} sticks out {T:his} tongue. "Nope! Not happening. Ask again maybe sometime never."`];

  options.push(`{T:name} rolls {T:his} eyes so hard that {T:his} whole head tilts back. 
    "Seriously? Maybe if you were good looking, but unfortunately..."`);

  return Random.from(options);
});
