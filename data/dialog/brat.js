
// Brats are playful, disobedient, and insulting. Brats can be any gender though if they're male they'll lean into the
// pratty femboy persona.

Dialog.register(Architype.brat, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} crosses {T:his} arms and smirks. "Training? Fine. But I'm not making it easy on you."`; });
Dialog.register(Architype.brat, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} shrugs with exaggerated indifference. "Whatever, sure. Just don't expect me to do all the work."`; });
Dialog.register(Architype.brat, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name} snorts. "Wow, really? You've got some nerve asking. Maybe you'll just have to make me."`; });
Dialog.register(Architype.brat, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} rolls {T:his} eyes so hard it looks painful. "With you? Ha! Dream on."`; });
