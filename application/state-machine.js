global.StateMachine = (function() {

  let $mode;
  let $modeChanged;

  function handleCommand(commandType, commandData) {
    const command = Command(commandType, commandData);

    log(`Run Command:${commandType}`, { system:'StateMachine', data:commandData });

    // Time system should run first. Every command should take some set amount time. This gives us our delta time.
    // Subsequent systems will then know how much time has passed since they were last run.
    TimeSystem.run(command);

    CharacterMovementSystem.run(command);

    TrainingSystem.run(command);
    DungeonSystem.run(command);

    render();
  }


  // The state machine should usually only change modes when it receives a command. However, starting a new game,
  // loading a game, or starting a fixture will set the mode directly as there's nothing that can send a command yet.
  // Even 'internally' to the StateMachine though it's the various systems that handles the commands and ultimately
  // needs to call the setMode() function, so it needs to be rather public. Still, a single command should only ever
  // change the mode once. If the mode has been changed then we know the view needs to be completely rebuilt.

  function getMode() { return $mode; }
  function setMode(mode) {
    if ($modeChanged) { throw "Mode has already been changed." }
    if (mode !== $mode) {
      $modeChanged = true;
      $mode = mode;
    }
  }

  // When the mode is set directly (when not sending a command) the render() function then needs to be called to update
  // the view. Setting the mode directly bypasses the other systems that run every turn (which it has to so that
  // nothing is updated when a game is loaded).
  function render() {
    if ($modeChanged) {

      if ($mode === GameMode.dungeon) { DungeonView.show(); }
      if ($mode === GameMode.location) { LocationView.show(); }
      if ($mode === GameMode.training) { TrainingView.show(); }

      $modeChanged = false;
      $mode = null;
    }
  }
  
  return {
    handleCommand,
    render,
    getMode,
    setMode,
  };

})();

