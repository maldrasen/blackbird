
NegotiationRequest.register('i-want-to-punch-you', {
  requirements: [
    NegotiationRequirements.hasStyle(NegotiationStyle.fierce),
  ],
  requestText: `Really, I just want to punch you in the face, okay?`,
  answers: {
    yes: { text:'Fine.', reaction:yesReaction },
    no: { text:'Refuse.', reaction:noReaction },
  },
  isRepeatable: false,
});

function yesReaction(context, parameters) {
}

function noReaction(context, parameters) {
}
