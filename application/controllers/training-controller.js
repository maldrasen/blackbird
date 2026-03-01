global.TrainingController = (function() {

  let $context, $partnerScales, $playerScales, $currentPosition, $possibleActions

  // Start needs to initialize all the controller's state variables so that state doesn't leak between training events.
  // These are the transient scale values that overflow into the acquired anima and animus at the end of training.
  function start(data) {
    $currentPosition = 'standing'
    $partnerScales = {
      anus:0, cervix:0, clit:0, nipple:0, throat:0, cock:0, prostate:0, urethra:0, pussy:0,
      anger:0, comfort:0, desire:0, shame:0, submission:0, suffering:0,
    };
    $playerScales = {
      anus:0, cervix:0, clit:0, nipple:0, throat:0, cock:0, prostate:0, urethra:0, pussy:0, desire:0
    };

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
    const playerSensations = result.getPlayerSensations();
    Object.keys(playerSensations).forEach(key => {
      $playerScales[key] += playerSensations[key];
    });

    const partnerSensations = result.getPartnerSensations();
    Object.keys(partnerSensations).forEach(key => {
      $partnerScales[key] += partnerSensations[key];
    });
  }

  function adjustStamina() {

  }

  return Object.freeze({
    getPartner: () => { return $context.T },
    getPlayer: () => { return $context.P },
    getContext: () => { return { ...$context }; },
    getCurrentPosition: () => { return $currentPosition; },
    getPossibleActions: () => { return [...$possibleActions]; },
    getPartnerScales: () => { return { ...$partnerScales }; },
    getPlayerScales: () => { return { ...$playerScales }; },
    start,
    handleSensationResult,
  });

})();
