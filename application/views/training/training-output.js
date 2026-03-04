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

  function show(sensationResult) {
    const response = sensationResult.getResponse();

    const output = X.createElement(`<div id='trainingOutput'></div>`);
    output.appendChild(buildSensationTable(response));
    GeneralOverlay.open(output, { classname:'small' });
  }

  function buildSensationTable(response) {
    const sensationTable = TableBuilder({ classname:'sensation-table' });

    AnimusComponent.getProperties().forEach(code => {
      if (response.partnerSensations[code]) {
        addSensationRow(sensationTable, code, response, 'animus'); }});

    AnimaComponent.getProperties().forEach(code => {
      if (response.partnerSensations[code]) {
        addSensationRow(sensationTable, code, response, 'anima'); }});

    if (response.partnerSensations.anger > 0) {
      addSensationRow(sensationTable, 'anger', response, 'anger'); }

    return sensationTable.getTable();
  }

  function addSensationRow(builder, code, response, type) {
    const sensationValue = response.partnerSensations[code];
    const previousValue = TrainingController.getPreviousPartnerScales()[code];
    const currentValue = TrainingController.getPartnerScales()[code];
    const previousLevel = TrainingController.determineScaleLevel(previousValue);
    const currentLevel = TrainingController.determineScaleLevel(currentValue);

    const level = (currentLevel === previousLevel) ?
      `Lv${currentLevel}` :
      `Lv${previousLevel} ${arrow} Lv${currentLevel}`;

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

    builder.addCell(level, { classname:'level' });
    builder.addCell(`(Next ${_scaleThresholds[currentLevel]})`, { classname:'thresholds' })
    builder.addCell(`${essenceLabel} (${essenceValue})`, { classname:'essences' })
  }

  return Object.freeze({ show });

})();