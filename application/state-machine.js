global.StateMachine = (function() {

  const Modes = { location:'location', training:'training' };

  let $mode;
  let $modeChanged;

  function handleCommand(command) {
    TimeSystem.run(command);

    render();
  }

  // Not sure about calling render directly. It might have to be called at least once when a game is loaded.
  function render() {
    if ($modeChanged) {

      if ($mode === Modes.location) {
        MainContent.setMainContent("views/location.html");
        MainContent.setBackground("backgrounds/filthy-hovel.jpg")
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
