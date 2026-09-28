global.InventoryRequirements = (function() {

  function hasArticlesWithTag(tag) {
    return Object.keys(Inventory().getArticlesWithTag(tag)).length > 0;
  }

  function hasArticlesWithAnyTag(tags) {
    return Object.keys(Inventory().getArticlesWithAnyTag(tags)).length > 0;
  }

  function hasArticlesWithEveryTag(tags) {
    return Object.keys(Inventory().getArticlesWithAnyTag(tags)).length > 0;
  }

  return {
    hasArticlesWithTag: tag =>       { return () => { return hasArticlesWithTag(tag); }},
    hasArticlesWithAnyTag: tags =>   { return () => { return hasArticlesWithTag(tags); }},
    hasArticlesWithEveryTag: tags => { return () => { return hasArticlesWithTag(tags); }},
  }

})();
