
NegotiationRequest.register('have-anything-unusual', {
  requirements: [
    InventoryRequirements.hasArticlesWithAnyTag(['bone','flesh']),
    CharacterRequirements.isSpeciesIn('T',['kobold','vermen']),
  ],
  requestParameters,
  requestText: `Have anything... unusual?`,
  answers: compileAnswers,
});

function requestParameters() {
  return { offers: Random.shuffle(Object.keys(Inventory().getArticlesWithAnyTag(['bone','flesh']))).slice(0,3) };
}

function compileAnswers(context, parameters) {
  const answers = {}

  parameters.offers.each(code => {
    answers[code] = { text:`Offer ${EnglishHelper.a_an(Article.lookup(code).getName())}`, reaction:Reaction.like(`Heh... Nice.`) };
  });

  answers.no = { text:'Refuse.', reaction:Reaction.dislike(`Tightwad.`) };
  return answers;
}
