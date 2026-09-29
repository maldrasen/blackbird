
NegotiationRequest.register('tit-slapping', {
  requirements: [
    PartyRequirements.someoneHas(id => { Character(id).breastsAreAtLeast('big') }),
    NegotiationRequirements.hasStyle(NegotiationStyle.fierce),
  ],
  requestParameters,
  requestText: `Let me slap your tits around for a little.`,
  answers: {
    yes: { text:'Fine.', reaction:yesReaction },
    no: { text:'Refuse.', reaction:noReaction },
  },
  isRepeatable: false,
});

function requestParameters(context) {
  const id = Object.keys(GameSystem.getState().getPartyConfiguration()).
    filter(id => { return Character(id).breastsAreAtLeast('big') }).
    sort((a,b) => { return BreastsComponent.lookup(b).absoluteBreastVolume - BreastsComponent.lookup(a).absoluteBreastVolume; })[0];

  const character = Character(id);

  const biggest = {
    id: id,
    isPlayer: id === context.P,
    name: character.getName(),
    her: PronounHelper.his(character.getGender())
  };

  console.log("Determined Biggest:",biggest);

  return biggest;

}

function yesReaction(context, parameters) {

}

function noReaction(context, parameters) {
}
