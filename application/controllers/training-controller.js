global.TrainingController = (function() {


  let $context, $trainingScales, $currentPosition, $possibleActions

  // Start needs to initialize all the controller's state variables so that state doesn't leak between training events.
  // These are the transient scale values that overflow into the acquired anima and animus at the end of training.
  function start(data) {
    $currentPosition = 'standing'
    $trainingScales = {
      anus:0, cervix:0, clit:0, nipple:0, throat:0, cock:0, prostate:0, urethra:0, pussy:0,
      anger:0, comfort:0, desire:0, shame:0, submission:0, suffering:0,
    };

    $context = {
      P: data.player,
      T: data.partner,
    }

    $possibleActions = SexAction.getPossible($context);
  }

  function handleSensationResult(result) {
    console.log("Got Sensation Results:",result.getResponse());

    TrainingView.update();
  }

  return Object.freeze({
    getPartner: () => { return $context.T },
    getPlayer: () => { return $context.P },
    getContext: () => { return { ...$context }; },
    getCurrentPosition: () => { return $currentPosition; },
    getPossibleActions: () => { return [...$possibleActions]; },
    getTrainingScales: () => { return { ...$trainingScales }; },
    start,
    handleSensationResult,
  });

})();
