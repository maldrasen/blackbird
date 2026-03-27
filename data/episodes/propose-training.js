Episode.register('propose-training',{
  layout: 'centered',
  pages: [{ contentFunction:generateContent, buttons:[
    { id:'proposeContinueButton', label:'Continue', callback:EpisodeController.endEpisode },
    { id:'proposeNevermindButton', classname:'hide', label:'Never mind…', callback:EpisodeController.endEpisode },
  ]}],
  endFunction: endProposition,
});

function endProposition() {
  const partner = EpisodeController.getPartner();

  // If no alternative has been set then we return to the previous mode,
  // otherwise we need to somehow adjust the training state before the training
  // begins. We can probably send context like that in the command so it
  // shouldn't be a problem. Stuff like bondage and grappling will need to be
  // implemented first, as forcing your partner is essentially combat with them.
  if (EpisodeController.getPropertyValue('attitude') === TrainingAttitude.unwilling) {
    return StateMachine.returnToPreviousMode();
  }

  StateMachine.handleCommand(CommandType.trainingStart, { characterId:partner });
}

function generateContent() {
  const personality = Personality(EpisodeController.getPartner());
  const archetype = personality.getArchetype();
  const attitude = personality.attitudeTowardsTraining();
  const template = Dialog.lookupTemplate(archetype, getDialogKey(attitude), EpisodeController.getContext());

  EpisodeController.setPropertyValue('attitude',attitude);

  if (attitude !== TrainingAttitude.unwilling) {
    return `<p>${template}</p>`
  }
  else {
    X.addClass('#proposeContinueButton','hide');
    X.removeClass('#proposeNevermindButton','hide');

    return `<div>
      <p>${template}</p>
      <div class='fg-weak'>(Unwilling Partner Options)</div>
    </div>`
  }
}

function getDialogKey(attitude) {
  switch(attitude) {
    case TrainingAttitude.eager: return DialogKeys.proposeTraining_Eager;
    case TrainingAttitude.willing: return DialogKeys.proposeTraining_Willing;
    case TrainingAttitude.reluctant: return DialogKeys.proposeTraining_Reluctant;
    case TrainingAttitude.unwilling: return DialogKeys.proposeTraining_Unwilling;
    default: throw new Error(`Unimplemented Attitude ${attitude}`);
  }
}
