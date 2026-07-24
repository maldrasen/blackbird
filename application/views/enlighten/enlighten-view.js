global.EnlightenView = (function() {

  let essenceBars = {};

  function init() {
    X.onClick('#enlightenView .continue-button', finish);
    X.onClick('#enlightenView .level-up-button', openLevelUp);
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
    showRevives();
    showEssenceBars();
  }

  function showSkillImprovements() {
    const improvements = EnlightenSystem.getState().getSkillImprovements();
    if (Object.keys(improvements).length > 0) {
      X.removeClass('#enlightenView .skill-improvements','hide');
      Object.keys(improvements).forEach(id => {
        X.first('#enlightenView .skill-improvements .character-grid').appendChild(buildSkillCharacterItem(id, improvements[id]));
      });
    }
  }

  function buildSkillCharacterItem(id, improvements) {
    const item = X.createElement(`<li class='character'>
      <span class='name'>${Character(id).getName()}</span>
      <ul class='skill-list'></ul>
    </li>`);

    Object.entries(improvements).forEach(([code,value]) =>
      item.querySelector('.skill-list').appendChild(TagElements.buildSkillTag(code,value)));

    return item;
  }

  function showRevives() {
    const revived = EnlightenSystem.getState().getRevived();
    if (revived.length > 0) {
      X.removeClass('#enlightenView .revived','hide');
      X.first('#enlightenView .revived').textContent = revivedSummary(revived);
    }
  }

  // TODO: I think this deserves more flavorful text, but this is fine for now.
  function revivedSummary(revived) {
    if (revived.length === 1) {
      return Weaver({ A:revived[0] }).weave(`{A:name} went down in the fight, but we were able to save {A:him}.`);
    }
    const names = EnglishHelper.joinList(revived.map(id => Character(id).getName()));
    return `${names} went down in the fight, but you were able to save them.`;
  }

  // ====================
  //    Essence Bars
  // ====================

  function showEssenceBars() {
    essenceBars = {};

    const essence = EnlightenSystem.getState().getEssence();
    X.removeClass('#enlightenView .essence-bars','hide');

    Object.keys(essence).forEach(id => {
      X.append('#enlightenView .essence-bars .character-grid', buildEssenceRow(id, essence[id].start));
      animateEssenceBar(id, essence[id].start);
    });
  }

  function buildEssenceRow(id, startingEssence) {
    const row = X.createElement(`<li class='character'>
      <div class='name'>${Character(id).getName()}</div>
      <div class='bar-cell'></div>
      <div class='actions'>
        <a href='#' class='button button-small button-primary level-up-button hide' data-id='${id}'>Level Up</a>
      </div>
    </li>`);

    const bounds = levelBounds(id);

    essenceBars[id] = BarDisplay({
      label: 'Essence',
      currentValue: startingEssence,
      minValue: bounds.floor,
      maxValue: bounds.ceiling,
      color: 'essence',
      flashOnFull: true,
    });

    row.querySelector('.bar-cell').appendChild(essenceBars[id].getElement());
    return row;
  }

  // The bar fills from the character's essence before the battle to their current banked total, measured through
  // the current level. Filling the bar completely means the character can level up, which raises the bounds and
  // runs the animation again from empty.
  function animateEssenceBar(id, fromEssence) {
    const bar = essenceBars[id];
    const { floor, ceiling } = levelBounds(id);
    const target = Math.min(ExperienceComponent.lookup(id).essence, ceiling);

    bar.setMinValue(floor);
    bar.setMaxValue(ceiling);
    bar.setCurrentValue(fromEssence);
    bar.setCurrentValue(target, { animate:true, onComplete:() => onBarFilled(id, target === ceiling) });
  }

  function onBarFilled(id, canLevel) {
    if (canLevel === false) { return; }
    X.removeClass(`#enlightenView .level-up-button[data-id='${id}']`,'hide');
  }

  function levelBounds(id) {
    const experience = ExperienceComponent.lookup(id);
    const species = Character(id).getSpecies();

    return {
      floor: EssenceSystem.totalEssenceToLevel(experience.level, species),
      ceiling: EssenceSystem.totalEssenceToLevel(experience.level + 1, species),
    };
  }

  function openLevelUp(event) {
    LevelUpOverlay.open(event.target.closest('.level-up-button').dataset.id);
  }

  function resume(id) {
    X.addClass(`#enlightenView .level-up-button[data-id='${id}']`,'hide');
    animateEssenceBar(id, levelBounds(id).floor);
  }

  function finish() {
    EnlightenSystem.finishEnlightenment();
    GameSystem.returnToPreviousMode();
  }

  return Object.freeze({
    init,
    show,
    resume,
  });

})();
