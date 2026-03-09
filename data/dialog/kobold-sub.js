
// Kobold society is strongly male dominated, though the kobold women are also vicious little bastards whenever they
// can get away with it.

Dialog.register(ArchitypeCode.koboldSub, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} drops {T:his} gaze immediately, ears flat and tail slowly raising 
      upward. "Of course master. Use this one however you want."`;
});

Dialog.register(ArchitypeCode.koboldSub, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} nods briefly before turning around and lifting {T:his} tail."`;
});

Dialog.register(ArchitypeCode.koboldSub, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} frowns a little and nods. "If that's what you want from me."`;
});

Dialog.register(ArchitypeCode.koboldSub, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} backs against the wall, {T:his} claws scraping against the hard floor.
      "No... don't hurt me."`;
});
