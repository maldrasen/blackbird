
NegotiationRequest.register('tit-slapping', {
  requirements: [
    PartyRequirements.someoneHas(id => Character(id).breastsAreAtLeast('big')),
    NegotiationRequirements.hasStyle(NegotiationStyle.fierce),
  ],
  requestParameters,
  requestText,
  answers: {
    yes: { text:'"Uh... Fine."', reaction:yesReaction },
    no: { text:'Refuse', reaction:noReaction },
  },
  isRepeatable: false,
});

function requestParameters(context) {
  const id = Object.keys(GameSystem.getState().getPartyConfiguration()).
    filter(id => Character(id).breastsAreAtLeast('big')).
    sort((a,b) => BreastsComponent.lookup(b).absoluteBreastVolume - BreastsComponent.lookup(a).absoluteBreastVolume)[0];

  return {
    id: id,
    isPlayer: id === context.P,
    her: PronounHelper.his(Character(id).getGender()),
    name: Character(id).getName(),
  };
}

function requestText(context, parameters) {
  return parameters.isPlayer ?
    `{T:TargetName} leers at you, staring at your breasts, "You've got some nice fat milkers. Let me slap your tits around for a little."` :
    `{T:TargetName} glances behind you, leering at ${parameters.name}, "Your slave's got some nice fat milkers. Let me slap ${parameters.her} tits around for a little."`;
}

// TODO: Write the player version of this when it's possible to have a female player. I'm thinking the default reaction
//       for this action is pity, they lose respect and fear if they're allowed to mistreat the player like this.
//
// TODO: We should add a memory and adjust a character's feelings when they're being pimped out like this.
function yesReaction(context, parameters) {
  if (parameters.isPlayer) { return Reaction.pity('TODO: Write This'); }
  return Reaction.lust(`TODO: Write a story where ${parameters.name} gets ${parameters.her} tits abused by {T:targetName}.`);
}

// The requester's not really upset if you don't submit to their unreasonable demands.
function noReaction(context, parameters) {
  return Reaction.neutral(`{T:TargetName} shrugs, "Heh, couldn't hurt to ask."`);
}
