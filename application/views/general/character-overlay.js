global.CharacterOverlay = (function() {

  // The CharacterOverlay is a good example of how the overlay window lifecycle can work. Loading an HTML file from
  // disk is fast enough to not worry about. If we get a fresh copy of the template every time there's no need to
  // worry about clearing the previous character. The only things that really has to happen when opening an overlay is
  // the overlay module needs to be pushed onto the WindowManager stack, and the overlay and cover should both be
  // shown. The WindowManager calls the close() function when the window is popped off the stack. The close() function
  // should empty the overlay, and hide it and the cover.

  let $id, $character;

  function init() {
    X.onClick('start-training', sendStartTrainingCommand);
  }

  // Because the CharacterOverlay displays available character actions, we might need some other options here.
  // Everything I need now though I can determine from the current state and the character data I think.
  //
  // Options
  //   id*  Character entity id.
  //
  function open(options) {
    $id = options.id;
    $character = Character($id);

    X.loadDocument('#characterOverlay','views/character-overlay.html');

    update();

    WindowManager.push(CharacterOverlay)
    X.removeClass('#characterOverlay','hide');
    X.removeClass('#overlayCover','hide');
  }

  function close() {
    X.empty('#characterOverlay');
    X.addClass('#characterOverlay','hide');
    X.addClass('#overlayCover','hide');
  }

  function update() {
    console.log("Update this.")
  }


  // TODO: Right now clicking on a character will just start the training mode with that character. Once I have more
  //       of the game's systems done clicking a character here should either start some kind of character interaction
  //       view or character inspection view. From there you can talk to them or see their character sheet and start
  //       the training mode. You should be able to ask a character to follow you, or capture them, if you want to take
  //       them to a bedroom. Some actions might only be available if the room matches, need to consider if the room
  //       has a bed or a shower or a pillory.
  //

  function sendStartTrainingCommand() {
    close();
    StateMachine.handleCommand(CommandType.startTraining, { characterId:$id });
  }


  return Object.freeze({
    init,
    open,
    close,
  });

})();