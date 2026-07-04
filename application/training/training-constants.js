global.TrainingConstants = Object.freeze({

  // Baseline penalty for repeated actions.
  repeatedBaselineFactor: 0.5,

  // Baseline reduction for persisted actions.
  persistedBaselineFactor: 0.666,

  // Baseline values for actions with low consent.
  unwillingAnger: 200,
  unwillingSuffering: 150,
  reluctantShame: 100,
  reluctantSubmission: 100,

  // Sensation Scale Factors. Applied to the transient training scales. The scales always start at F, so F is
  // deliberately a steep penalty. A fresh session should feel muted until the scales build up.
  scaleFactors: {
    F: 0.25,
    D: 0.5,
    C: 1,
    B: 1.5,
    A: 2,
    S: 4,
    SS: 8,
    SSS: 16,
  },

  // Sensitivity Factors. Applied to a character's persistent body part sensitivities. Unlike the scale factors above,
  // F here represents an average/baseline sensitivity, not a numb starting point, so it factors at 1 and ramps up
  // slowly. A level of 0 (no sensitivity at all) is handled separately and always factors at 0.
  sensitivityFactors: {
    F: 1,
    D: 1.1,
    C: 1.3,
    B: 1.6,
    A: 2,
    S: 3,
    SS: 4,
    SSS: 5,
  },

});
