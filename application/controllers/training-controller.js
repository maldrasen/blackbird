global.TrainingController = (function() {

  let $context, $player, $partner, $currentPosition, $possibleActions, $anima, $animus, $essenceOfAnger,
      $partnerScales, $previousPartnerScales, $playerScales, $previousPlayerScales;

  // Start needs to initialize all the controller's state variables so that state doesn't leak between training events.
  // These are the transient scale values that overflow into the acquired anima and animus at the end of training.
  //
  // TODO: It's possible that a character may have some initial anger (or comfort) but that would depend on how this
  //       training began and their feelings towards the player.
  function startTraining(data) {
    $currentPosition = 'standing'

    $anima = {};
    $animus = {};
    $essenceOfAnger = 0;
    $partnerScales = { anger:0 };
    $previousPartnerScales = { anger:0 };
    $playerScales = { desire:0 };
    $previousPlayerScales = { desire:0 };

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

  // TODO: Update the Arousal component, deleting everything but arousal. Also reduce arousal to something ambient.
  //       Once training is over we show the 'level up' view.
  function endTraining() {
    console.log("=== End Training ===")
  }

  function handleSensationResult(result) {
    updateTrainingScales(result);
    updateStamina(result);
    updateArousal(result);

    TrainingView.update();
    TrainingOutput.show(result);
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

    Object.keys(scales).forEach(key => {
      previousScales[key] = scales[key];
    });

    Object.keys(sensations).forEach(key => {
      scales[key] += sensations[key];

      const previousLevel = determineScaleLevel(previousScales[key]);
      const newLevel = determineScaleLevel(scales[key]);

      if (isPartner && newLevel > previousLevel) {
        const overflow = scales[key] - _scaleThresholds[newLevel-1];
        if (key === 'anger') { $essenceOfAnger += overflow; }
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
  function updateArousal(result) {
    updateArousalFor($player, result.getPlayerSensations());
    updateArousalFor($partner, result.getPartnerSensations());
  }

  function updateArousalFor(entity, sensations) {
    let mostIntense;

    const character = Character(entity);
    const rValue = 0.0035;
    const pleasureDecayRate = 0.75;
    const comparative = ComponentMath.saturatingGrowthCurve(sensations.desire, 100, rValue);
    const arousalData = ArousalComponent.lookup(entity);
    const previousArousal = arousalData.arousal;

    if (comparative < arousalData.arousal) {
      const difference = arousalData.arousal - comparative;
      arousalData.arousal -= (difference/2);
    }
    if (comparative > arousalData.arousal) {
      const difference = comparative - arousalData.arousal;
      arousalData.arousal += (difference/2);
    }

    if (arousalData.refectory == null) { arousalData.refectory = 0; }
    if (arousalData.pleasure == null) { arousalData.pleasure = 0; }

    arousalData.pleasure *= pleasureDecayRate;

    AnimusComponent.getProperties().forEach(key => {
      if (sensations[key] > 0) {
        arousalData.pleasure += sensations[key];
        if (mostIntense == null || mostIntense.value < sensations[key]) {
          mostIntense = { code:key, value:sensations[key] };
        }
      }
    });

    const isOrgasm = character.rollForOrgasm(mostIntense);

    // TODO: Everything else that needs to happen when a character orgasms.
    //       We need something to hold that information so that it can be
    //       displayed in the UI.

    if (isOrgasm) {
      arousalData.edging = 0;
      arousalData.refectory = character.rollRefectoryPeriod();
    }
    if (isOrgasm === false) {
      arousalData.edging = calculateEdging(character.getOrgasmThreshold(), arousalData);
      arousalData.refectory = arousalData.refectory === 0 ? 0 : arousalData.refectory - 1;
    }

    ArousalComponent.update(entity, ObjectHelper.unfloat(arousalData));

    if (character.isPlayer() === false) {
      Balance.arousal({
        desire: sensations.desire,
        comparative: comparative,
        previousArousal: previousArousal,
        currentArousal: arousalData.arousal
      });
    }
  }

  // The edging value can be a little arbitrary. It just needs to be a positive number that increases every turn that
  // the pleasure is over the orgasm threshold. The edging value should drop when the pleasure is under the threshold,
  // though not as quickly.
  function calculateEdging(threshold, arousalData) {
    const pleasure = arousalData.pleasure || 0;
    let edging = arousalData.edging || 0;

    if (pleasure > threshold) { edging += (pleasure - threshold) * 0.15; }
    if (pleasure < threshold) { edging -= (threshold - pleasure) * 0.10; }

    return (edging < 0) ? 0 : Math.round(edging);
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
    getEssenceOfAnger: () => { return $essenceOfAnger },
    getPartnerScales: () => { return { ...$partnerScales }; },
    getPreviousPartnerScales: () => { return { ...$previousPartnerScales }; },
    getPlayerScales: () => { return { ...$playerScales }; },
    getPreviousPlayerScales: () => { return { ...$previousPlayerScales }; },
    startTraining,
    endTraining,
    handleSensationResult,
    updateTrainingScales,
    determineScaleLevel,
    updateArousal,
    updateStamina,
  });

})();
