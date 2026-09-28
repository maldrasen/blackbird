
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

  parameters.offers.forEach(code => {
    const name = Article.lookup(code).getName();
    answers[code] = { text:`Offer ${EnglishHelper.a_an(name)} ${name}`, reaction:gaveItem(code) };
  });

  answers.no = { text:'Refuse.', reaction:Reaction.dislike(`Tightwad.`) };
  return answers;
}

function gaveItem(code) {
  return () => {
    const value = Article.lookup(code).getValue();
    Inventory().removeArticle(code,1);

    return Reaction.like(`Heh... Nice.`);
  }
}
