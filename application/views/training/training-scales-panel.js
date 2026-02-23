global.TrainingScalesPanel = (function() {

  const scaleLabels = {
    anal:       'Anus Sense',
    cervical:   'Cervix Sense',
    clitoral:   'Clitoris Sense',
    nipple:     'Nipple Sense',
    oral:       'Throat Sense',
    penile:     'Cock Sense',
    prostate:   'Prostate Sense',
    urethral:   'Urethra Sense',
    vaginal:    'Vagina Sense',
    anger:      'Anger',
    comfort:    'Comfort',
    desire:     'Desire',
    shame:      'Shame',
    submission: 'Submission',
    suffering:  'Suffering',
  }

  const scaleBars = {};

  function build() {
    const scales = TrainingController.getTrainingScales();
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
      label: `${scaleLabels[scale]} (Rank ${grade.letter})`,
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
    bar.setLabel(`${scaleLabels[scale]} (Rank ${grade.letter})`);
    bar.setMaxValue(grade.range);
    bar.setCurrentValue(grade.progress);
  }


  return Object.freeze({
    build,
    setScaleValue,
  });

})();