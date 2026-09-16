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

  function showCommands(codes) {
    const character = BattleSystem.getRound().getActingCharacter();

    show();
    X.fill('#commandPanel #title',X.createElement(`<span class='name'>${character.getName()}</span>`));
    X.empty(`#commandPanel #commandArea`);
    X.empty(`#commandPanel #utilityArea`);

    codes.forEach(code => {
      const command = BattleCommand.lookup(code);
      X.append(getCommandArea(command.getCategory()), X.createElement(`<a class='button button-primary command' data-command='${code}'>${command.getName()}${keyHint(code)}</a>`));
    });
  }

  function keyHint(code) {
    const key = KeyBindings.getBinding('battle', code);
    return key ? `<span class='key-hint'>${KeyBindings.labelFor(key)}</span>` : '';
  }

  function getCommandArea(category) {
    if (category === 'basic') { return '#commandArea'; }
    if (category === 'utility') { return '#utilityArea'; }
    throw new Error(`We need an area for this category: ${category}`);
  }

  // A command with an overlay picks up from there once the overlay has chosen. Otherwise the command needs a target
  // picked first, or runs at once.
  function executeCommand(event) {
    const command = BattleCommand.lookup(event.target.closest('.command').dataset.command);
    if (command.hasOverlay()) {
      return command.openOverlay();
    }

    command.getTargetingMode() != null ? TargetingController.startTargeting(command) : command.execute();
  }

  function isAcceptingCommands() {
    return X.first('#battleView') != null
        && X.hasClass('#commandPanel','hide') === false
        && X.hasClass('#battleView','target-mode') === false;
  }

  function pressCommand(code) {
    const button = X.first(`#commandPanel .command[data-command='${code}']`);
    if (button) { button.click(); }
  }

  return {
    init,
    show,
    hide,
    showCommands,
  };

})();
