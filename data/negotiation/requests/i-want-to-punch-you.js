
NegotiationRequest.register('i-want-to-punch-you', {
  requirements: [
    NegotiationRequirements.hasStyle(NegotiationStyle.fierce),
  ],
  requestText: `"Really, I just want to punch you in the face, okay?"`,
  answers: {
    yes: { text:'"Uh... Fine"', reaction:yesReaction },
    no: { text:'Refuse', reaction:noReaction },
  },
  isRepeatable: false,
});

function yesReaction(context, parameters) {
  return Reaction.pity(`TODO: He punches you in the face.`);
}

function noReaction(context, parameters) {
  return Reaction.respect(`{T:TargetName} smirks, "Heh, you never know what people will fall for."`);
}
