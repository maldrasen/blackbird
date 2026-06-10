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

  function showCommands(commands) {
    const state = BattleController.getState();
    const character = Character(state.getActingCharacter());

    show();
    X.fill('#commandPanel #title',X.createElement(`<span class='name'>${character.getName()}</span>`));
    X.empty(`#commandPanel #commandArea`);
    X.empty(`#commandPanel #utilityArea`);

    commands.forEach(command => {
      const area = (command.layout === 'utility') ? '#utilityArea' : '#commandArea';
      X.append(area, X.createElement(`<a class='button button-primary command' data-command='${command.command}'>${command.name}</a>`));
    });
  }

  function executeCommand(event) {
    const command = event.target.dataset.command;

    switch(command) {
      case BattleCommand.basicAttack: return TargetingController.startBasicAttackTargeting();
      case BattleCommand.changeEquipment: return ChangeEquipment.start();
      case BattleCommand.useItem: return UseItem.start();
      default: throw new Error(`Unrecognized Command: ${command}`);
    }
  }

  return Object.freeze({
    init,
    show,
    hide,
    showCommands,
  })

})();