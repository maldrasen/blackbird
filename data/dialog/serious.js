
Dialog.register(Architype.serious, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} gives a single, decisive nod. "Alright. Let's not waste time then."`; });
Dialog.register(Architype.serious, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} meets your gaze evenly. "I can do that. Just tell me what you need."`; });
Dialog.register(Architype.serious, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name}'s jaw tightens slightly. "Hmm, well. If you think it's absolutely necessary."`; });
Dialog.register(Architype.serious, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} holds up a hand, voice flat. "No. That's my final answer."`; });
