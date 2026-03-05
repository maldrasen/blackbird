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

    const extra = extraClass(response.partner[code]);

    builder.addRow({ classname:`${code} ${type}` })
    builder.addCell(`${ScaleLabels[code]}`, { id:`${code}TrainingOutput`, classname:`${extra} tooltip-parent sensations` });
    builder.addCell(`${previousScale.progress}`, { classname:'values' });
    builder.addCell(`+ ${sensationValue}`, { classname:'values' });
    builder.addCell(rankChanged ? `- ${previousScale.range}`:'', { classname:'values' });
    builder.addCell(`= ${currentScale.progress}`, { classname:'values' });
    builder.addCell(rankDisplay, { classname:`ranks ${rankClass}` });
    builder.addCell(`${currentScale.range}`, { classname:`thresholds ${rankClass}` });
    builder.addCell(`${essenceLabel} (${essenceValue})`, { classname:'essences' });

    Tooltip.register(`${code}TrainingOutput`,{
      content: buildSensationTooltip(code, response.partner[code], sensationValue),
      classname: `training-output-tooltip`,
    });
  }

  function buildSensationTooltip(code, sensations, total) {
    const adds = []
    const mults = []

    sensations.forEach(sense => {
      if (sense.op === 'add') { adds.push(sense); }
      if (sense.op === 'mult') { mults.push(sense); }
    });

    let math = `(`
    for (let i=0; i<adds.length; i++) {
      math += adds[i].extra ? `<span class='fg-extra-${adds[i].extra}'>` : `<span>`
      math += `${adds[i].label}[${StringHelper.formatNumber(adds[i].value)}]`;
      math += `</span>`
      if (i < adds.length-1) { math += ` + ` }
    }
    math += `)`

    mults.forEach(sense => {
      math += ` × `
      math += sense.extra ? `<span class='fg-extra-${sense.extra}'>` : `<span>`
      math += `${sense.label}[${StringHelper.formatNumber(sense.value)}]`;
      math += `</span>`
    });

    math += ` = ${total}`

    return `<div class='calculation'>
      <div class='scale-label'>${ScaleLabels[code]}</div>
      <div class='math'>${math}</div>
    </div>`
  }

  // Each sensation can have a different 'extra' value (poor, good, crit, or fumble) so this function returns the
  // highest priority extra if there is one.
  function extraClass(sensations) {
    if (sensations.filter(sense => { return sense.extra === 'crit' }).length > 0) { return `fg-extra-crit` }
    if (sensations.filter(sense => { return sense.extra === 'fumble' }).length > 0) { return `fg-extra-fumble` }
    if (sensations.filter(sense => { return sense.extra === 'poor' }).length > 0) { return `fg-extra-poor` }
    if (sensations.filter(sense => { return sense.extra === 'good' }).length > 0) { return `fg-extra-good` }
    return '';
  }

  return Object.freeze({ show });

})();