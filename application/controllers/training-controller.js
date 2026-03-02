global.TrainingController = (function() {

  let $context, $currentPosition, $possibleActions,
    $anima, $animus, $partnerScales, $previousPartnerScales, $playerScales, $previousPlayerScales;



  // Start needs to initialize all the controller's state variables so that state doesn't leak between training events.
  // These are the transient scale values that overflow into the acquired anima and animus at the end of training.
  function start(data) {
    $currentPosition = 'standing'

    $anima = {};
    $animus = {};
    $partnerScales = {};
    $playerScales = { desire:0 };

    AnimaComponent.getProperties().forEach(key => {
      $anima[key] = 0;
      $partnerScales[key] = 0;
    });

    AnimusComponent.getProperties().forEach(key => {
      $animus[key] = 0;
      $partnerScales[key] = 0;
      $playerScales[key] = 0;
    });

    $context = {
      P: data.player,
      T: data.partner,
    }

    $possibleActions = SexAction.getPossible($context);
  }

  function handleSensationResult(result) {
    console.log("Got Sensation Results:",result.getResponse());

    updateTrainingScales(result);

    // Adjust arousal
    //   Arousal should go up or down depending on the amount of desire generated. I think we multiply the desire by
    //   some factor (maybe 0.1) And if the resulting desire is less than the arousal, we lower it by an amount based
    //   on the difference between the desire with the factor and the current arousal, or we raise it in a similar way
    //   if the desire is higher than the current. The goal is to keep desire floating between 0-100. Keeping it
    //   consistently high should require the desire from the sensations to be very high. Foreplay actions though
    //   should produce more desire than servicing or fucking. Difficult actions in particular don't generate much
    //   arousal without the associated preferences, so the arousal system should usually have the player going back to
    //   foreplay when their partner's arousal dips.

    adjustStamina()

    TrainingView.update();
  }

  // We need to check for anima overflow as the scales are updated.
  function updateTrainingScales(result) {
    updateScales(result.getPlayerSensations(), $previousPlayerScales, $playerScales, false);
    updateScales(result.getPartnerSensations(), $previousPartnerScales, $partnerScales, true);
  }

  // When we update the training scales, we check to see if any of the partner scale levels have risen. When they do,
  // the scale overflow amount is converted to anima or animus. We need to keep track of the previous scale values to
  // show in the action output.
  function updateScales(sensations, previousScales, scales, isPartner) {

    previousScales = {};
    Object.keys(scales).forEach(key => {
      previousScales[key] = scales[key];
    });

    Object.keys(sensations).forEach(key => {
      scales[key] += sensations[key];

      const previousLevel = determineLevel(previousScales[key]);
      const newLevel = determineLevel(scales[key]);

      if (isPartner && newLevel > previousLevel) {
        const overflow = scales[key] - _scaleThresholds[newLevel-1];
        if ($anima[key] != null) { $anima[key] += overflow; }
        if ($animus[key] != null) { $animus[key] += overflow; }
      }
    });
  }

  function determineLevel(value) {
    let level = 0;
    _scaleThresholds.forEach(max => {
      if (max <= value) { level += 1; }
    });
    return level;
  }

  function adjustStamina() {

  }

  return Object.freeze({
    getPartner: () => { return $context.T },
    getPlayer: () => { return $context.P },
    getContext: () => { return { ...$context }; },
    getCurrentPosition: () => { return $currentPosition; },
    getPossibleActions: () => { return [...$possibleActions]; },
    getAnima: () => { return { ...$anima }; },
    getAnimus: () => { return { ...$animus }; },
    getPartnerScales: () => { return { ...$partnerScales }; },
    getPreviousPartnerScales: () => { return { ...$previousPartnerScales }; },
    getPlayerScales: () => { return { ...$playerScales }; },
    getPreviousPlayerScales: () => { return { ...$previousPlayerScales }; },
    start,
    handleSensationResult,
    updateTrainingScales,
    determineLevel,
    adjustStamina,
  });

})();
