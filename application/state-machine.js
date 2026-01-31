global.StateMachine = (function() {

  let $mode;

  function handleCommand(command) {
    TimeSystem.run(command)
  }

  return {
    handleCommand
  };

})();
