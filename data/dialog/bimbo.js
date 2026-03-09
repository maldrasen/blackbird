
// Bimbos love sex and are kind of stupid. We'll eventually have a personality monitoring system to ensure that bimbo
// characters never get too smart, or too calm. Bimbos will also always be females or futas so we know they at least
// have tits, though not always necessarily large tits. (big-tit-bimbo should be a child archetype that falls back to
// bimbo)

// TODO: Should either switch on breast size here or make that big-tit-bimbo chile archetype.
Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} bounces in place, {T:his} {T:breasts.bigTits} swinging 
    enticingly, "Training? Sure! Let's do it right now!"`;
});

Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} grins and twirls a strand of {T:body.hairColor} hair around 
    {T:his} finger. "Umm, sure! That sounds fun."`
});

Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} tilts {T:his} head, looking a little confused. "I guess? I 
    mean... it's  kind of a lot. But okay, sure."`
});

Dialog.register(ArchetypeCode.bimbo, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} pouts and shakes {T:his} head. "No, I don't wanna. I've got 
      like, a headache or something."`;
});
