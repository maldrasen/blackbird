global.TrainingController = (function() {

  let $context, $player, $partner, $currentPosition, $possibleActions, $anima, $animus, $partnerScales,
      $previousPartnerScales, $playerScales, $previousPlayerScales;

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

    $player = data.player;
    $partner = data.partner;

    $context = {
      P: data.player,
      T: data.partner,
    }

    $possibleActions = SexAction.getPossible($context);
  }

  function handleSensationResult(result) {
    updateTrainingScales(result);
    updateStamina(result);
    updateArousal(result);

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

      const previousLevel = determineScaleLevel(previousScales[key]);
      const newLevel = determineScaleLevel(scales[key]);

      if (isPartner && newLevel > previousLevel) {
        const overflow = scales[key] - _scaleThresholds[newLevel-1];
        if ($anima[key] != null) { $anima[key] += overflow; }
        if ($animus[key] != null) { $animus[key] += overflow; }
      }
    });
  }

  function determineScaleLevel(value) {
    let level = 0;
    _scaleThresholds.forEach(max => {
      if (max <= value) { level += 1; }
    });
    return level;
  }

  // The desire generated should cause the arousal to increase or decrease. The goal is to keep arousal value floating
  // between 0 and 100. Keeping the arousal consistently high should require the desire from the sensations to be very
  // high. Foreplay actions should produce more desire than servicing or fucking. Difficult actions in particular don't
  // generate much desire without the associated preferences. The idea is that the arousal system should usually have
  // the player going back to foreplay when their partner's arousal dips.
  //
  // I'm going to need to experiment with different r values here as small changes (0.002 vs 0.003) will have dramatic
  // results with how arousal is generated. I'll know it's too high if arousal is consistently pulled into the 90s. I
  // might need to look into dynamically adjusting the r-value based on a character's feelings or the other factors
  // that determine the desire values. (Or clamp the desire into a known range.)
  //
  // TODO: Updating the arousal should also update the pleasure...
  //
  function updateArousal(result) {
    updateArousalFor($player, result.getPlayerSensations().desire);
    updateArousalFor($partner, result.getPartnerSensations().desire);
  }

  function updateArousalFor(entity, desire) {
    const rValue = 0.0025;
    const comparative = ComponentMath.saturatingGrowthCurve(desire, 100, rValue);
    const arousal = ArousalComponent.lookup(entity).arousal;

    if (comparative < arousal) {
      const difference = arousal - comparative;
      ArousalComponent.update(entity, { arousal: arousal - (difference/2) })
    }
    if (comparative > arousal) {
      const difference = comparative - arousal;
      ArousalComponent.update(entity, { arousal: arousal + (difference/2) })
    }
  }

  // For now, we can just subtract the action stamina cost from the current staminas.
  function updateStamina(result) {
    const action = SexAction.lookup(result.getSexAction());
    const playerHealth = HealthComponent.lookup($player);
    const partnerHealth = HealthComponent.lookup($partner);

    playerHealth.currentStamina -= action.getPlayerStamina();
    partnerHealth.currentStamina -= action.getPartnerStamina();

    if (playerHealth.currentStamina < 0) { playerHealth.currentStamina = 0; }
    if (partnerHealth.currentStamina < 0) { partnerHealth.currentStamina = 0; }

    HealthComponent.update($player, playerHealth);
    HealthComponent.update($partner, partnerHealth);
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
    determineScaleLevel,
    updateArousal,
    updateStamina,
  });

})();
