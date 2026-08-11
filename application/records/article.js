global.Article = (function() {
  const articles = {};

  function register(code,data) {
    if (articles[code] != null) { throw new Error(`Article code [${code}] is already registered`); }
    articles[code] = data;
  }

  function lookup(code) {
    if (articles[code] == null) { throw new Error(`Bad article code [${code}]`); }

    const article = { ...articles[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getType: () => { return article.type; },
      getCategory: () => { return article.category; },
      getName: () => { return article.name; },
      getDescription: () => { return article.description; },
      getIcon: () => { return article.icon; },
      getIconColor: () => { return article.iconColor; },
      getTags: () => { return [...(article.tags||[])]; },
    });
  }

  return Object.freeze({
    register,
    lookup,
  });

})();
