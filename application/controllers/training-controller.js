global.TrainingController = (function() {

  // The scale thresholds could be played with a bit, raised or lowered as needed as the levels aren't very even at all.
  const ScaleThresholds = [100, 500, 3000, 10000, 30000, 60000, 100000, 250000, 600000, 1000000];

  let $context, $trainingScales, $currentPosition, $possibleActions

  // Start needs to initialize all the controller's state variables so that state doesn't leak between training events.
  // These are the transient scale values that overflow into the acquired anima and animus at the end of training.
  function start(data) {
    $currentPosition = 'standing'
    $trainingScales = {
      anal:0, cervical:0, clitoral:0, nipple:0, oral:0, penile:0, prostate:0, urethral:0, vaginal:0,
      anger:0, comfort:0, desire:0, shame:0, submission:0, suffering:0,
    };

    $context = {
      P: data.player,
      T: data.partner,
    }

    $possibleActions = SexAction.getPossible($context);
  }

  return Object.freeze({
    getPartner: () => { return $context.T },
    getPlayer: () => { return $context.P },
    getContext: () => { return { ...$context }; },
    getCurrentPosition: () => { return $currentPosition; },
    getPossibleActions: () => { return [...$possibleActions]; },
    getTrainingScales: () => { return { ...$trainingScales }; },
    start,
  });

})();
