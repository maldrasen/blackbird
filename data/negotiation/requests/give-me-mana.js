
NegotiationRequest.register('give-me-mana', {
  staticRequirements: [CharacterRequirements.hasAnyMana('P')],
  getRequestParameters,
  getRequestText,
  answers: {
    yes: { text:(context, parameters) => { return `Give {T:him} ${parameters.amount} ${parameters.color} mana.` }},
    no: { text:'Refuse.' },
  }
});

// In this request, we first determine what colors of mana the player has. We pick a color at random, then the player
// offers somewhere between 1/10 and 1/2 of their current mana, but no more than 32. Because the request parameters
// will always be somewhat random we need to memoize them.
function getRequestParameters(context) {
  const mana = ManaComponent.lookup(context.P);
  const manaBounds = {};

  Object.entries(mana).forEach((color,component) => {
    if (component.current > 0) { manaBounds[color] = component.current; }
  });

  const color = Random.from(Object.keys(manaBounds));
  const current = manaBounds[color];
  const min = Math.max(32, Math.ceil(current/10));
  const max = Math.min(min, Math.floor(current/2));
  const amount = Random.between(min, max);

  return { color, amount };
}

function getRequestText(context, parameters) {
  return `"Hmm... Give me some ${parameters.color} mana."`
}
