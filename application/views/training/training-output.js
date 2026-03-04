global.TrainingOutput = (function() {

  function show(sensationResult) {
    let output = X.createElement('<p>Training Output</p>');
    GeneralOverlay.open(output, { classname:'small' });
  }

  return Object.freeze({ show });

})();