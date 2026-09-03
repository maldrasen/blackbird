global.Application = (function() {

  function init() {
    ReferenceValidator.validate();
    ArticleAppraiser.run();
  }

  return {
    init,
  }

})();