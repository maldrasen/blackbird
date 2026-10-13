global.TrainingSupport = (function() {

  function standardTrainingState(playerOptions={}, partnerOptions={}) {
    const player = CharacterSupport.genericMale(playerOptions);
    const partner = CharacterSupport.genericFemale(partnerOptions);
    const feelings = { ...{ affection:100, fear:10, respect:50 }, ...(partnerOptions.feelings||{}) };

    GameSystem.getState().setPlayer(player);
    FeelingsComponent.create(partner, { target:player, ...feelings });
    ControlledComponent.create(partner, partnerOptions.controlled || { control:50 })

    return TrainingState({ player:player, partner:partner });
  }

  function standardTrainingContext(playerOptions={}, partnerOptions={}) {
    return standardTrainingState(playerOptions, partnerOptions).getContext();
  }

  return {
    standardTrainingState,
    standardTrainingContext,
  };

})();