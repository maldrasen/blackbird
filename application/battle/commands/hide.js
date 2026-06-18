global.Hide = (function() {

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