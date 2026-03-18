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




  // Sensation Scale Factors
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

});
