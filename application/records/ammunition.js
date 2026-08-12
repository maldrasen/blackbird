global.Ammunition = (function() {
  const ammunitionRecords = {};

  function register(code,data) {
    const { effects, stories, ...articleData } = data;

    Article.register(code, { ...articleData, type:ArticleType.consumable });
    ammunitionRecords[code] = { effects, stories };
  }

  function lookup(code) {
    if (ammunitionRecords[code] == null) { throw new Error(`Bad consumable code [${code}]`); }

    const consumable = { ...ammunitionRecords[code] };
    const article = Article.lookup(code);

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return article.getName(); },
      getDescription: () => { return article.getDescription(); },
      getCategory: () => { return article.getCategory(); },
      getTags: () => { return article.getTags(); },
      getDamageTypes: () => {  }
    });
  }

  return Object.freeze({
    register,
    lookup,
  });

})();
