global.Application = (function() {

  function init() {
    ReferenceValidator.validate();
    MonsterType.compile();
    BaseMonster.compile();
    AbilityAppraiser.run();
    ArticleAppraiser.run();
  }

  return {
    init,
  }

})();