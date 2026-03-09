
// The serious characters have a high violent score. They're more interested in exploring the dungeon than they are in
// being trained for sex, but they know it's part of the arrangement. They're violent when they need to be, and take
// situations seriously.

Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Eager, context => {
  return `{T:name} gives a single, decisive nod. "Alright. Let's not waste time then."`; });
Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Willing, context => {
  return `{T:name} meets your gaze evenly. "I can do that. Just tell me what you need."`; });
Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Reluctant, context => {
  return `{T:name}'s jaw tightens slightly. "Hmm, well. If you think it's absolutely necessary."`; });
Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Unwilling, context => {
  return `{T:name} holds up a hand, voice flat. "No. That's my final answer."`; });
