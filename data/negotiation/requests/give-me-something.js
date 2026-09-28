
NegotiationRequest.register('give-me-something', {
  requirements: [
    hasItemsWithTag('valuable')
  ],
  requestText: `Give me something nice.`,
  answers: compileAnswers,
});

function hasItemsWithTag(tag) {
  return () => {
    const inventory = GameSystem.getState().getPartyInventory();
    console.log("Inventory:",inventory);
    return true;
  }
}

function compileAnswers(parameters) {
  return {
    no: { text:'Refuse.', reaction:Reaction.dislike(`Tightwad.`) },
  }
}
