global.TrainingFixtures = (function() {

  function standardTrainingState(playerOptions={}, partnerOptions={}) {
    const player = CharacterFixtures.genericMale(playerOptions);
    const partner = CharacterFixtures.genericFemale(partnerOptions);
    const feelings = { ...{ affection:100, fear:10, respect:50 }, ...(partnerOptions.feelings||{}) };

    GameState.setPlayer(player);
    FeelingsComponent.create(partner, { target:player, ...feelings });
    ControlledComponent.create(partner, partnerOptions.controlled || { control:50 })

    return TrainingState({ player:player, partner:partner });
  }

  function standardTrainingContext(playerOptions={}, partnerOptions={}) {
    return standardTrainingState(playerOptions, partnerOptions).getContext();
  }

  return Object.freeze({
    standardTrainingState,
    standardTrainingContext,
  });

})();