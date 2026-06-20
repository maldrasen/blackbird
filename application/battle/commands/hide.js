global.Hide = (function() {

  // How do hide checks work?
  // Like other skills hide should be opposed. Hide skill vs perception.
  // We don't actually have a perception skill though.

  function execute(id) {
    return {
      time: 1000,
      messages: [{ text:`${id} does a hide.` }]
    }
  }

  return Object.freeze({
    execute,
  })

})();