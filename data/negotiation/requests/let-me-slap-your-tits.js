
NegotiationRequest.register('let-me-slap-your-tits', {
  requirements: [
    CharacterRequirements.hasBreasts('P'),
    NegotiationRequirements.hasStyle(NegotiationStyle.fierce),
  ],
  requestText: `Let me slap your tits around for a little.`,
  answers: {
    yes: { text:'Fine.', reaction:yesReaction },
    no: { text:'Refuse.', reaction:noReaction },
  },
  isRepeatable: false,
});

function yesReaction(context, parameters) {
  // gives a sadistic and pugilist preference.
}

function noReaction(context, parameters) {
}
