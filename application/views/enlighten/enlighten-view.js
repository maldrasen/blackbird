global.EnlightenView = (function() {
  const arrow = `→`;

  function init() {
    X.onClick('#enlightenView .button-complete', complete);
  }

  function show() {
    MainContent.setMainContent("views/enlighten.html");

    if (EnlightenSystem.getState().getFrom() === 'training') { return showTrainingResults(); }
    showBattleResults();
  }

  // TODO: The training enlighten view is task 122.
  function showTrainingResults() {
    X.removeClass('#enlightenView .button-complete','hide');
  }

  function showBattleResults() {
    const state = EnlightenSystem.getState();

    X.fill('#enlightenView .essence-summary', essenceSummary(state.getEssenceAwards()));
    X.fill('#enlightenView .results-table-area', buildResultsTable(state));
    X.removeClass('#enlightenView .button-complete','hide');
  }

  function essenceSummary(essenceAwards) {
    const text = essenceAwards.total === 0
      ? `No essence was gathered from the battle.`
      : `The party absorbs ${essenceAwards.total} essence — ${essenceAwards.share} for each member.`;

    return X.createElement(`<p>${text}</p>`);
  }

  function buildResultsTable(state) {
    const awards = state.getEssenceAwards().awards;
    const skillImprovements = state.getSkillImprovements() || {};
    const characters = [...new Set([...Object.keys(awards), ...Object.keys(skillImprovements)])];

    const builder = TableBuilder({ classname:'enlighten-results-table' });

    builder.addRow({ classname:'header' });
    ['Character','Essence','Skills'].forEach(text => { builder.addCell(text, { classname:text.toLowerCase() }); });

    characters.forEach(id => {
      builder.addRow();
      builder.addCell(Character(id).getName(), { classname:'character' });
      builder.addCell(`${awards[id] || 0}`, { classname:'essence' });
      builder.addCell(skillSummary(skillImprovements[id]), { classname:'skills' });
    });

    return builder.getTable();
  }

  function skillSummary(improvements) {
    if (improvements == null) { return ''; }

    return Object.entries(improvements).map(([code,level]) => {
      return `${Skill.lookup(code).getName()} ${arrow} ${level}`;
    }).join(', ');
  }

  function complete() {
    EnlightenSystem.finishEnlightenment();
    GameSystem.returnToPreviousMode();
  }

  return Object.freeze({
    init: init,
    show: show,
  });

})();
