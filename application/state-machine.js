global.StateMachine = (function() {

  let $currentMode;
  let $pendingMode;
  let $deltaTime;

  function handleCommand(commandType, commandData) {
    console.log(`Command:${commandType} : ${JSON.stringify(commandData)}`)
    const command = Command(commandType, commandData);

    log(`Run Command:${commandType}`, { system:'StateMachine', data:commandData });

    CharacterMovementSystem.run(command);
    TrainingSystem.run(command);
    DungeonSystem.run(command);

    // Time system should run last. Every command should take some set amount time, and will set the delta time when
    // the command is handled by the associated system. The time system will determine if anything is scheduled to
    // happen, update the time in the GameState, and clear the delta time afterward.
    TimeSystem.run();

    render();
  }

  function setDeltaTime(time) {
    if ($deltaTime != null) { throw "Delta time has already been set." }
    $deltaTime = time;
  }

  // The state machine should usually only change modes when it receives a command. However, starting a new game,
  // loading a game, or starting a fixture will set the mode directly as there's nothing that can send a command yet.
  // Even 'internally' to the StateMachine though it's the various systems that handle the commands and ultimately
  // needs to call the setMode() function, so it needs to be rather public. Still, a single command should only ever
  // change the mode once. If the mode has been changed then we know the view needs to be completely rebuilt.

  function setMode(mode) {
    if ($pendingMode) { throw "Mode has already been changed." }
    if (mode !== $currentMode) {
      $pendingMode = mode;
    }
  }

  // When the mode is set directly (when not sending a command) the render() function then needs to be called to update
  // the view. Setting the mode directly bypasses the other systems that run every turn (which it has to so that
  // nothing is updated when a game is loaded).
  function render() {
    if ($pendingMode) {

      if ($pendingMode === GameMode.dungeon) { DungeonView.show(); }
      if ($pendingMode === GameMode.location) { LocationView.show(); }
      if ($pendingMode === GameMode.training) { TrainingView.show(); }

      $currentMode = $pendingMode;
      $pendingMode = null;
    }
  }
  
  return {
    clearDeltaTime: () => { $deltaTime = null; },
    getDeltaTime: () => { return $deltaTime; },
    setDeltaTime,
    getMode: () => { return $currentMode; },
    setMode,
    handleCommand,
    render,
  };

})();

