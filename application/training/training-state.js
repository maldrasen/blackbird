global.TrainingState = function(data) {

  let previousAction;
  let persistedActions = [];
  let currentPosition = 'standing'

  let essenceOfAnger = 0;
  const anima = {};
  const animus = {};

  const partnerScales = { anger:0 };
  const previousPartnerScales = { anger:0 };
  const playerScales = { desire:0 };
  const previousPlayerScales = { desire:0 };

  AnimaComponent.getProperties().forEach(key => {
    anima[key] = 0;
    partnerScales[key] = 0;
  });

  AnimusComponent.getProperties().forEach(key => {
    animus[key] = 0;
    partnerScales[key] = 0;
    playerScales[key] = 0;
  });

  const player = data.player;
  const partner = data.partner;

  const context = {
    P: data.player,
    T: data.partner,
  };

  const possibleActions = SexAction.getPossible(context);

  // We need to check for anima overflow as the scales are updated.
  function updateTrainingScales(result) {
    updateScales(result.getPlayerSensations(), previousPlayerScales, playerScales, false);
    updateScales(result.getPartnerSensations(), previousPartnerScales, partnerScales, true);
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

      const previousLevel = TrainingState.determineScaleLevel(previousScales[key]);
      const newLevel = TrainingState.determineScaleLevel(scales[key]);

      if (isPartner && newLevel > previousLevel) {
        const overflow = scales[key] - _scaleThresholds[previousLevel];
        if (key === 'anger') { essenceOfAnger += overflow; }
        if (anima[key] != null) { anima[key] += overflow; }
        if (animus[key] != null) { animus[key] += overflow; }
      }
    });
  }

  // I feel like I have an irrational hatred of JavaScript's splice function,
  // but it's the only way to remove an array element.
  function removePersistedAction(code) {
    const index = persistedActions.findIndex(action => action.getCode() === code);
    if (index < 0) { throw `Action:${code} has not been persisted.` }
    persistedActions.splice(index, 1);
  }

  return Object.freeze({
    getPlayer: () => { return player; },
    getPartner: () => { return partner; },
    getContext: () => { return { ...context }; },
    getPossibleActions: () => { return [...possibleActions]; },

    getAnima: () => { return { ...anima }; },
    getAnimus: () => { return { ...animus }; },
    getEssenceOfAnger: () => { return essenceOfAnger; },
    getPartnerScales: () => { return { ...partnerScales }; },
    getPreviousPartnerScales: () => { return { ...previousPartnerScales }; },
    getPlayerScales: () => { return { ...playerScales }; },
    getPreviousPlayerScales: () => { return { ...previousPlayerScales }; },

    setCurrentPosition: position => { currentPosition = position; },
    getCurrentPosition: () => { return currentPosition; },
    setPreviousAction: action => { previousAction = action; },
    getPreviousAction: () => { return previousAction; },

    addPersistedAction: code => { persistedActions.push(PersistedAction(code, {...context})); },
    getPersistedActions: () => { return persistedActions; },
    removeAllPersistedActions: () => { persistedActions = []; },
    removePersistedAction,

    updateTrainingScales,
    setPartnerScaleValue: (key,value) => { partnerScales[key] = value; },
    setPlayerScaleValue: (key,value) => { playerScales[key] = value; },
  });
}

TrainingState.determineScaleLevel = function(value) {
  let level = 0;
  _scaleThresholds.forEach(max => {
    if (max <= value) { level += 1; }
  });
  return level;
}
