global.CommandPanel = (function() {

  function init() {
    X.onClick('#commandPanel .command', executeCommand);
  }

  function show() {
    X.addClass('#textPanel','hide');
    X.removeClass('#commandPanel','hide');
  }

  function hide() {
    X.removeClass('#textPanel','hide');
    X.addClass('#commandPanel','hide');
  }

  function showCommands(abilities) {
    const character = BattleSystem.getRound().getActingCharacter();

    show();
    X.fill('#commandPanel #title',X.createElement(`<span class='name'>${character.getName()}</span>`));
    X.empty(`#commandPanel #commandArea`);
    X.empty(`#commandPanel #utilityArea`);

    abilities.forEach(code => {
      const ability = Ability.lookup(code);
      X.append(getCommandArea(ability.getCategory()), X.createElement(`<a class='button button-primary command' data-ability='${code}'>${ability.getName()}</a>`));
    });
  }

  function getCommandArea(category) {
    if (category === 'basic') { return '#commandArea'; }
    if (category === 'utility') { return '#utilityArea'; }
    throw new Error(`We need an area for this category: ${category}`);
  }

  function executeCommand(event) {
    const ability = Ability.lookup(event.target.dataset.ability);
    if (ability.hasOverlay()) {
      return ability.openOverlay();
    }

    ability.getTargetingMode() != null ? TargetingController.startTargeting(ability.getCode()) : ability.execute();
  }

  return Object.freeze({
    init,
    show,
    hide,
    showCommands,
  })

})();