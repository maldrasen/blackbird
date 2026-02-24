global.TrainingFixtures = (function() {

  function standardTrainingContext(playerOptions={}, partnerOptions={}) {
    const player = CharacterFixtures.genericMale(playerOptions);
    const partner = CharacterFixtures.genericFemale(partnerOptions);
    const feelings = { ...{ affection:100, fear:10, respect:50 }, ...(partnerOptions.feelings || {})};

    FeelingsComponent.create(partner, { target:player, ...feelings });
    ControlledComponent.create(partner, partnerOptions.controlled || { control:50 })

    return { P:player, T:partner };
  }

  return Object.freeze({
    standardTrainingContext,
  });

})();