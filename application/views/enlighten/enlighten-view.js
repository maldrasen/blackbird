global.EnlightenView = (function() {

  function init() {
    X.onClick('#enlightenView .continue-button', finish);
  }

  function show() {
    MainContent.setMainContent("views/enlighten.html");

    switch (EnlightenSystem.getState().getFrom()) {
      case 'training': return showTrainingResults();
      case 'battle': return showBattleResults();
    }
  }

  // TODO: The training enlighten view is task 122.
  function showTrainingResults() {
    showSkillImprovements();
  }

  function showBattleResults() {
    showSkillImprovements();

    // X.fill('#enlightenView .essence-summary', essenceSummary(state.getEssenceAwards()));
    //
    // if (state.getRevived().length > 0) {
    //   X.fill('#enlightenView .revived-summary', revivedSummary(state.getRevived()));
    // }
    //
    // X.fill('#enlightenView .results-table-area', buildResultsTable(state));
    //
    // const footer = EnlightenSystem.hasPendingLevelUps() ? '.button-advance' : '.button-complete';
    // X.removeClass(`#enlightenView ${footer}`,'hide');
  }

  function showSkillImprovements() {
    const improvements = EnlightenSystem.getState().getSkillImprovements();
    console.log(improvements);
  }




/*
  function essenceSummary(essenceAwards) {
    const text = essenceAwards.total === 0
      ? `No essence was gathered from the battle.`
      : `The party absorbs ${essenceAwards.total} essence — ${essenceAwards.share} for each member.`;

    return X.createElement(`<p>${text}</p>`);
  }

  // TODO: I think this deserves more flavorful text, but this is fine for now.
  function revivedSummary(revived) {
    const names = EnglishHelper.joinList(revived.map(id => Character(id).getName()));
    const text = `${names} went down in the fight, but you were able to save them.`;
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

  function showLevelUpPhase() {
    const id = EnlightenSystem.getCurrentLevelUp();
    if (id == null) { return showLevelUpsComplete(); }

    const experience = ExperienceComponent.lookup(id);

    X.addClass('#enlightenView .enlighten-results','hide');
    X.addClass('#enlightenView .button-advance','hide');
    X.addClass('#enlightenView .level-up-result','hide');
    X.removeClass('#enlightenView .enlighten-level-up','hide');

    X.first('#enlightenView .level-up-title').innerHTML = Character(id).getName();
    X.first('#enlightenView .level-up-summary').innerHTML = `Level ${experience.level} ${arrow} ${experience.level + 1}. Choose an attribute to raise.`;

    fillAttributePicks(id);
  }

  function fillAttributePicks(id) {
    const attributes = AttributesComponent.lookup(id);
    X.empty('#enlightenView .attribute-picks');

    Object.keys(Attrib).forEach(code => {
      X.append('#enlightenView .attribute-picks', X.createElement(
        `<a href='#' class='button attribute-pick' data-attribute='${code}'>${StringHelper.titlecase(code)} (${attributes[code]})</a>`));
    });
  }

  function pickAttribute(event) {
    const attribute = event.target.closest('.attribute-pick').dataset.attribute;
    const result = EnlightenSystem.chooseLevelUpAttribute(attribute);

    X.empty('#enlightenView .attribute-picks');
    X.fill('#enlightenView .level-up-result', buildLevelUpResult(result));
    X.removeClass('#enlightenView .level-up-result','hide');
  }

  function buildLevelUpResult(result) {
    const element = X.createElement(`<div class='result-content'></div>`);
    element.appendChild(X.createElement(
      `<p>+${result.increase} ${StringHelper.titlecase(result.attribute)}, reaching level ${result.level}.</p>`));
    element.appendChild(X.createElement(`<a href='#' class='button button-next-level'>Continue</a>`));
    return element;
  }

  function showLevelUpsComplete() {
    X.addClass('#enlightenView .enlighten-level-up','hide');
    X.removeClass('#enlightenView .enlighten-results','hide');
    X.removeClass('#enlightenView .button-complete','hide');
  }
*/

  function finish() {
    EnlightenSystem.finishEnlightenment();
    GameSystem.returnToPreviousMode();
  }

  return Object.freeze({
    init: init,
    show: show,
  });

})();
