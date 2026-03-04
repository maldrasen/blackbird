global.TrainingOutput = (function() {

  const arrow = `→`;

  const labels = {
    anus: 'Pleasure (Anus)',
    cervix: 'Pleasure (Cervix)',
    cock: 'Pleasure (Cock)',
    clit: 'Pleasure (Clitoris)',
    nipple: 'Pleasure (Nipples)',
    prostate: 'Pleasure (Prostate)',
    pussy: 'Pleasure (Pussy)',
    throat: 'Pleasure (Throat)',
    urethra: 'Pleasure (Urethra)',
    comfort: 'Comfort',
    desire: 'Desire',
    shame: 'Shame',
    submission: 'Submission',
    suffering: 'Suffering',
    anger: 'Anger',
  }

  const rankClasses = ['fg-rank-F','fg-rank-D','fg-rank-C','fg-rank-B',
    'fg-rank-A','fg-rank-S','fg-rank-SS','fg-rank-SSS']

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
    ['','',''].forEach(() => { builder.addCell('') });
    ['rank','threshold','essence'].forEach(
      text => { builder.addCell(StringHelper.titlecase(text), { classname:text });
    });
  }

  // TODO: Still need to add the tooltips detailing all the factors for each of the sensations.
  function addSensationRow(builder, code, response, type) {
    const sensationValue = response.partnerSensations[code];
    const previousValue = TrainingController.getPreviousPartnerScales()[code];
    const currentValue = TrainingController.getPartnerScales()[code];
    const previousLevel = TrainingController.determineScaleLevel(previousValue);
    const currentLevel = TrainingController.determineScaleLevel(currentValue);

    const rank = (currentLevel === previousLevel) ?
      `${currentLevel}` :
      `${previousLevel} ${arrow} ${currentLevel}`;

    let essenceValue = TrainingController.getEssenceOfAnger();
    let essenceLabel = 'Essence of Anger'

    if (type === 'animus') {
      essenceValue = TrainingController.getAnimus()[code];
      essenceLabel = `${StringHelper.titlecase(code)} Animus`; }
    if (type === 'anima') {
      essenceValue = TrainingController.getAnima()[code];
      essenceLabel = `${StringHelper.titlecase(code)} Anima`; }

    builder.addRow({ classname:`${code} ${type}` })
    builder.addCell(`${labels[code]}`, { classname:'label' });

    // If there has been an orgasm, change this to include the orgasm value
    // subtracted from the pleasure scales (90% of the orgasm threshold)
    builder.addCell(`${previousValue}`, { classname:'values' })
    builder.addCell(`+ ${sensationValue}`, { classname:'values' })
    builder.addCell(`= ${currentValue}`, { classname:'values' });

    builder.addCell(rank, { classname:`ranks ${rankClasses[currentLevel]}` });
    builder.addCell(`(Next ${_scaleThresholds[currentLevel]})`, { classname:`thresholds ${rankClasses[currentLevel]}` })
    builder.addCell(`${essenceLabel} (${essenceValue})`, { classname:'essences' })
  }

  return Object.freeze({ show });

})();