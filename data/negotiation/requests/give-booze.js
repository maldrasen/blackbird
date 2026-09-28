
NegotiationRequest.register('give-booze', {
  requirements: [
    InventoryRequirements.hasArticlesWithTag('alcohol'),
  ],
  requestParameters,
  requestText: `You know, I'm feeling kind of thirsty...`,
  answers: compileAnswers,
});

function requestParameters() {
  return { offers: Random.shuffle(Object.keys(Inventory().getArticlesWithTag('alcohol'))).slice(0,2) };
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

  answers.piss = { text:`"So, you want to be my toilet?"`, reaction:pissReaction };
  answers.no = { text:`So?`, reaction:refused };
  return answers;
}

// TODO: More and better refusal text.
function refused() {
  return Reaction.dislike(`Asshole.`);
}

function pissReaction(context) {
  const character = Character(context.T);
  const interested = character.hasSexualPreference('piss-slut',1) ||
      character.hasSexualPreference('perverted',1) ||
      Archetype.lookup(character.getArchetype()).getNegotiationStyle() === NegotiationStyle.lewd;

  return interested ?
    Reaction.lust(`{T:TargetName} grins and licks {T:his} lips, "Heh, maybe later. I like where your head's at though."`,{ givePreferences:{ 'piss-slut':15 }}) :
    Reaction.hate(`{T:TargetName} frowns deeply, "Yeah, no..."`);
}

// TODO: This will also need more and better reaction text, based on both the personality archetype and the item's
//       value.
function gaveItem(code) {
  Inventory().removeArticle(code,1);
  return Reaction.withValue(`Thanks.`, Article.lookup(code).getValue());
}
