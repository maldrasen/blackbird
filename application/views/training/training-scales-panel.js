global.TrainingScalesPanel = (function() {

  const scaleBars = {};

  function build() {
    const scales = TrainingController.getPartnerScales();
    Object.keys(scales).forEach(scale => {
      addScale(scale, scales[scale]);
    });
  }

  function addScale(scale, value) {
    const grade = LetterGradeHelper.scaleValue(value);

    scaleBars[scale] = BarDisplay({
      maxValue: grade.range,
      minValue: 0,
      currentValue: grade.progress,
      label: `${ScaleLabels[scale]} (Rank ${grade.letter})`,
      color: `rank-${grade.letter}`,
    });

    const cell = X.createElement(`<div class='cell'></div>`);
          cell.appendChild(scaleBars[scale].getElement());

    if (value === 0) {
      X.addClass(scaleBars[scale].getElement().closest('.cell'),'hide')
    }

    X.first('#trainingView .scales-panel').appendChild(cell);
  }

  function setScaleValue(scale, value) {
    const grade = LetterGradeHelper.scaleValue(value);
    const bar = scaleBars[scale]

    X.removeClass(bar.getElement().closest('.cell'),'hide')

    bar.setColor(`rank-${grade.letter}`);
    bar.setLabel(`${ScaleLabels[scale]} (Rank ${grade.letter})`);
    bar.setMaxValue(grade.range);
    bar.setCurrentValue(grade.progress);
  }

  function update() {
    const scales = TrainingController.getPartnerScales();
    Object.keys(scales).forEach(scale => {
      if (scales[scale] > 0) { setScaleValue(scale, scales[scale]); }
    });
  }

  return Object.freeze({
    build,
    setScaleValue,
    update,
  });

})();