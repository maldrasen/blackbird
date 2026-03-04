global.TrainingOutput = (function() {
  const arrow = `→`;

  function show(sensationResult) {
    const response = sensationResult.getResponse();

    const output = X.createElement(`<div id='trainingOutput'></div>`);
    output.appendChild(X.createElement(`<p>Action Story...</p>`));
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
  //
  // TODO: This will probably break when we jump two levels at once. Need a good way to make that possible before I can
  //       test that though.
  //
  // TODO: When the partner orgasms we need to also show the sense reduction that occurs as well. In the ERA games an
  //       orgasm reduced the accumulated scale by 90% of the orgasm threshold.
  //
  function addSensationRow(builder, code, response, type) {
    const sensationValue = response.partnerSensations[code];
    const currentValue = TrainingController.getPartnerScales()[code];
    const currentScale = LetterGradeHelper.scaleValue(currentValue)

    const previousValue = TrainingController.getPreviousPartnerScales()[code];
    const previousScale = LetterGradeHelper.scaleValue(previousValue);

    const rankChanged = previousScale.letter !== currentScale.letter;
    const rankDisplay = rankChanged ? `${previousScale.letter} ${arrow} ${currentScale.letter}` : `${currentScale.letter}`;
    const rankClass = `fg-rank-${currentScale.letter}`;

    let essenceValue = TrainingController.getEssenceOfAnger();
    let essenceLabel = 'Essence of Anger'

    if (type === 'animus') {
      essenceValue = TrainingController.getAnimus()[code];
      essenceLabel = `${StringHelper.titlecase(code)} Animus`; }
    if (type === 'anima') {
      essenceValue = TrainingController.getAnima()[code];
      essenceLabel = `${StringHelper.titlecase(code)} Anima`; }

    builder.addRow({ classname:`${code} ${type}` })
    builder.addCell(`${ScaleLabels[code]}`, { classname:'sensations' });
    builder.addCell(`${previousScale.progress}`, { classname:'values' });
    builder.addCell(`+ ${sensationValue}`, { classname:'values' });
    builder.addCell(rankChanged ? `- ${previousScale.range}`:'', { classname:'values' });
    builder.addCell(`= ${currentScale.progress}`, { classname:'values' });
    builder.addCell(rankDisplay, { classname:`ranks ${rankClass}` });
    builder.addCell(`${currentScale.range}`, { classname:`thresholds ${rankClass}` })
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