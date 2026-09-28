
NegotiationRequest.register('give-bones', {
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
    answers[code] = {
      text:`Offer ${EnglishHelper.a_an(name)} ${name}`,
      reaction: () => { return gaveItem(code); },
    };
  });

  answers.no = { text:'Refuse.', reaction:refused };
  return answers;
}

// TODO: More and better refusal text.
function refused() {
  return Reaction.dislike(`Tightwad.`);
}

// TODO: This will also need more and better reaction text, based on both the personality archetype and the item's
//       value.
function gaveItem(code) {
  Inventory().removeArticle(code,1);
  return Reaction.withValue(`Heh... Nice.`, Article.lookup(code).getValue());
}
