
NegotiationRequest.register('give-me-mana', {
  requirements: [CharacterRequirements.hasAnyMana('P')],
  getRequestParameters,
  getRequestText,
  answers: {
    yes: { text:agreeText, reaction:yesReaction },
    no: { text:'Refuse.', reaction:noReaction },
  },
});

function agreeText(parameters) {
  return `Let {T:him} absorb ${parameters.amount} ${parameters.color} mana.`;
}

// In this request, we first determine what colors of mana the player has. We pick a color at random, then the player
// offers somewhere between 1/10 and 1/2 of their current mana, but no more than 32. Because the request parameters
// will always be somewhat random we need to memoize them.
function getRequestParameters(context) {
  const mana = ManaComponent.lookup(context.P);
  const manaBounds = {};

  Object.entries(mana).forEach(([color,component]) => {
    if (component.current > 0) { manaBounds[color] = component.current; }
  });

  const color = Random.from(Object.keys(manaBounds));
  const current = manaBounds[color];
  const min = Math.ceil(current/10);
  const max = Math.max(min, Math.min(32, Math.floor(current/2)));
  const amount = Random.between(min, max);

  return { color, amount };
}

// TODO: Adjust the request text for personality archetype and stuff.
function getRequestText(context, parameters) {
  return `"Hmm... Give me some ${parameters.color} mana."`
}

// TODO: Adjust the reaction text for personality archetype and stuff.
function yesReaction(context, parameters) {
  ManaSystem.spendMana(context.P, parameters.color, parameters.amount);
  return Reaction.respect(`Oh yeah, that's the stuff.`);
}

// TODO: Adjust the reaction text for personality archetype and stuff.
function noReaction(context, parameters) {
  return Reaction.disrespect(`Stingy ass {P:species.elf}.`);
}
