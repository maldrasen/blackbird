global.TrainingScalesPanel = (function() {

  function build() {

    const scales = TrainingController.getTrainingScales();
    Object.keys(scales).forEach(scale => {
      addScale(scale, Random.between(0,10000));
      // addScale(scale, scales[scale]);
    });
  }

  function addScale(scale, value) {
    X.first('#trainingView .scales-panel').appendChild(X.createElement(`<div>${scale}:${value}</div>`))
  }

  return Object.freeze({
    build
  });

})();