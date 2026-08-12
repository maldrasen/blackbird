global.ItemLoom = (function() {

  function weave(subject, token) {
    return subject[0] === '∈' ? weaveItem(subject, token) : weaveArticle(subject, token)
  }

  function weaveItem(id, token) {
    const item = Item(id);
    switch (token) {
      case 'name': return item.getName();
      default: return Weaver.formatWarning(`[Item:${token}]`);
    }
  }

  function weaveArticle(code, token) {
    const article = Article.lookup(code);
    switch (token) {
      case 'name': return article.getName();
      default: return Weaver.formatWarning(`[Article:${token}]`);
    }
  }

  return Object.freeze({
    weave,
  });

})();