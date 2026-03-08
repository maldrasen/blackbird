
// TODO: We actually need to check breast size and gender here.
Dialog.register(Architype.bimbo, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} bounces in place, {T:his} {T:breasts.bigTits} swinging 
    enticingly, "Training? Sure! Let's do it right now!"`;
});

Dialog.register(Architype.bimbo, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} grins and twirls a strand of {T:body.hairColor} hair around 
    {T:his} finger. "Umm, sure! That sounds fun."`
});

Dialog.register(Architype.bimbo, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} tilts {T:his} head, looking a little confused. "I guess? I 
    mean... it's  kind of a lot. But okay, sure."`
});

Dialog.register(Architype.bimbo, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} pouts and shakes {T:his} head. "No, I don't wanna. I've got 
      like, a headache or something."`;
});
