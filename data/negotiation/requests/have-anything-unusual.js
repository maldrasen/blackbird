
NegotiationRequest.register('have-anything-unusual', {
  requirements: [
    InventoryRequirements.hasArticlesWithAnyTag(['bone','flesh']),
  ],
  requestText: `Have anything... unusual?`,
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
