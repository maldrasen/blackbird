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


});
