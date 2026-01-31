global.StateMachine = (function() {

  const Modes = { location:'location', training:'training' };

  let $mode;
  let $modeChanged;

  function handleCommand(command) {

    // Time system should run first. Every command should take some set amount time. This gives us our delta time.
    // Subsequent systems will then know how much time has passed since they were last run.
    TimeSystem.run(command);

    CharacterMovementSystem.run(command);

    render();
  }

  // Not sure about calling render directly. It might have to be called at least once when a game is loaded.
  function render() {
    if ($modeChanged) {

      if ($mode === Modes.location) {
        LocationView.show();
      }
      if ($mode === Modes.training) {
        TrainingView.show();
      }
    }
  }

  // Adjusted by the fixture right now, but changing the mode is something that should probably only happen internally.
  // The plan is for the state machine to only change itself based on the command received. It will run all the
  // systems and the systems change the state of all the components, but the state itself should only be governed from
  // within. At least that's my current thinking. Also not sure yet what sets the initial mode. Will need to happen the
  // game is loaded I think.
  function getMode() { return $mode; }
  function setMode(mode) {
    if (mode !== $mode) { $modeChanged = true; }
    $mode = mode;
  }

  return {
    handleCommand,
    render,
    getMode,
    setMode,
  };

})();
