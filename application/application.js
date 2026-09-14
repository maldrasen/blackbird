global.Application = (function() {

  function init() {
    ReferenceValidator.validate();
    AbilityAppraiser.run();
    ArticleAppraiser.run();
  }

  return {
    init,
  }

})();