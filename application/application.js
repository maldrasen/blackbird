global.Application = (function() {

  function init() {
    ReferenceValidator.validate();
    MonsterType.compile();
    BaseMonster.compile();
    ArticleAppraiser.run();
  }

  return {
    init,
  }

})();