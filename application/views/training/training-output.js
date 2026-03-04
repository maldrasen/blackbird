global.TrainingOutput = (function() {

  const arrow = `→`;

  function show(sensationResult) {
    const response = sensationResult.getResponse();

    const output = X.createElement(`<div id='trainingOutput'></div>`);
    output.appendChild(buildSensationTable(response));
    GeneralOverlay.open(output, { classname:'small' });
  }

  function buildSensationTable(response) {
    const builder = TableBuilder({ classname:'sensation-table' });

    addHeader(builder);

    AnimusComponent.getProperties().forEach(code => {
      if (response.partnerSensations[code]) {
        addSensationRow(builder, code, response, 'animus'); }});

    AnimaComponent.getProperties().forEach(code => {
      if (response.partnerSensations[code]) {
        addSensationRow(builder, code, response, 'anima'); }});

    if (response.partnerSensations.anger > 0) {
      addSensationRow(builder, 'anger', response, 'anger'); }

    return builder.getTable();
  }

  function addHeader(builder) {
    builder.addRow({ classname:'header' });
    builder.addCell('Sensation', {classname: 'sensation' });
    ['','','',''].forEach(() => { builder.addCell('') });
    ['rank','threshold','essence'].forEach(
      text => { builder.addCell(StringHelper.titlecase(text), { classname:text });
    });
  }

  // TODO: Still need to add the tooltips detailing all the factors for each of the sensations.
  function addSensationRow(builder, code, response, type) {
    const sensationValue = response.partnerSensations[code];
    const currentValue = TrainingController.getPartnerScales()[code];
    const scaleValue = LetterGradeHelper.scaleValue(currentValue)

    const previousValue = TrainingController.getPreviousPartnerScales()[code];
    const previousLevel = TrainingController.determineScaleLevel(previousValue);
    const previousLetter = LetterGradeHelper.sensitivityValue(previousLevel+1);
    const previousThreshold = _scaleThresholds[previousLevel];

    const rankChanged = previousLetter !== scaleValue.letter;
    const rankDisplay = rankChanged ? `${previousLetter} ${arrow} ${scaleValue.letter}` : `${scaleValue.letter}`;
    const rankClass = `fg-rank-${scaleValue.letter}`;

    // console.log(`\n==== ${code} ====`)
    // console.log(`Sen:${sensationValue} Current:${currentValue}`,scaleValue);
    // console.log(`Prev${previousValue} / ${previousLevel} / ${previousLetter} / ${previousThreshold}`);
    // console.log(`Current: ${currentLevel} / ${currentLetter}`);
    // console.log(`Rank Changed? ${rankChanged} / ${rankDisplay}`);

    let essenceValue = TrainingController.getEssenceOfAnger();
    let essenceLabel = 'Essence of Anger'

    if (type === 'animus') {
      essenceValue = TrainingController.getAnimus()[code];
      essenceLabel = `${StringHelper.titlecase(code)} Animus`; }
    if (type === 'anima') {
      essenceValue = TrainingController.getAnima()[code];
      essenceLabel = `${StringHelper.titlecase(code)} Anima`; }

    builder.addRow({ classname:`${code} ${type}` })
    builder.addCell(`${ScaleLabels[code]}`, { classname:'label' });

    // If there has been an orgasm, change this to include the orgasm value
    // subtracted from the pleasure scales (90% of the orgasm threshold)
    builder.addCell(`${previousValue}`, { classname:'values' });
    builder.addCell(`+ ${sensationValue}`, { classname:'values' });
    builder.addCell(rankChanged ? `- ${previousThreshold}`:'', { classname:'values' });
    builder.addCell(`= ${scaleValue.progress}`, { classname:'values' });

    builder.addCell(rankDisplay, { classname:`ranks ${rankClass}` });
    builder.addCell(`${scaleValue.range}`, { classname:`thresholds ${rankClass}` })
    builder.addCell(`${essenceLabel} (${essenceValue})`, { classname:'essences' })
  }

  // Because the scales show the thresholds as if the current scale value has been set to 0, we need to subtract the
  // difference between
  function differenceBetweenLevels(previous, current) {
    if (previous === current) { return 0; }
    console.log(`--- ${previous} -> ${current}`);
    console.log(_scaleThresholds[previous], _scaleThresholds[current]);
    return _scaleThresholds[current] - _scaleThresholds[previous];
  }

  return Object.freeze({ show });

})();