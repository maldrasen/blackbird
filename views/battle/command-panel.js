global.CommandPanel = (function() {

  function init() {
    X.onClick('#commandPanel .command', executeCommand);
    KeyBindingDispatcher.register('battle', { isActive:isAcceptingCommands, perform:pressCommand });
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

  // The command panel owns the keyboard while it's showing and not waiting on a target. While targeting, the command
  // buttons are only hidden, and click() doesn't care about that.
  function isAcceptingCommands() {
    return X.first('#battleView') != null
        && X.hasClass('#commandPanel','hide') === false
        && X.hasClass('#battleView','target-mode') === false;
  }

  // A key press clicks the button so that both paths share executeCommand(). A command that can't be used this round
  // has no button, so its key does nothing.
  function pressCommand(code) {
    const button = X.first(`#commandPanel .command[data-ability='${code}']`);
    if (button) { button.click(); }
  }

  return {
    init,
    show,
    hide,
    showCommands,
  };

})();