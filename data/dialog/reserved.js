
Dialog.register(Architype.reserved, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} pauses, then nods once. "Yes. I'm ready when you are."`; });
Dialog.register(Architype.reserved, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} considers for a moment before answering. "Alright. I don't have any objections."`; });
Dialog.register(Architype.reserved, DialogKeys.proposeTraining_Reluctant, context => {
  return  `{T:name} is quiet for a beat. "Well... I'm not opposed. I just need a moment."`; });
Dialog.register(Architype.reserved, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} shakes {T:his} head without any particular emotion. "No. I would prefer not to."`; });
