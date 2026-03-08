
Dialog.register(Architype.playful, DialogKeys.proposeTraining_Eager, context => {
  return  `{T:name} laughs and bends over a little in front of you, wiggling 
    {T:his} ass invitingly. "Finally! Come and take it {P:insultingName}."`;
});

Dialog.register(Architype.playful, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} taps {T:his} chin with one finger, pretending to think it over. "Hmm... okay, sure, let's do it."`;
});

Dialog.register(Architype.playful, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} squints at you with a lopsided grin. "You're serious? Alright, but you owe me one."`;
});

Dialog.register(Architype.playful, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} sticks out {T:his} tongue. "Nope! Not happening. Ask again maybe sometime never."`;
});
