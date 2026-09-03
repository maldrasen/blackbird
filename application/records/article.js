global.Article = (function() {
  const articles = {};

  function register(code,data) {
    articles[code] = data;
  }

  function getAllCodes() {
    return Object.keys(articles);
  }

  function setValue(code, value) {
    if (articles[code].value != null) {
      throw new Error(`The value of article[${code}] has already been appraised.`);
    }
    articles[code].value = value;
  }

  function lookup(code) {
    if (articles[code] == null) { throw new Error(`Bad article code [${code}]`); }

    const article = { ...articles[code] };

    return {
      getCode: () => { return code; },
      getType: () => { return article.type || ArticleType.article; },
      getCategory: () => { return article.category; },
      getName: () => { return article.name; },
      getDescription: () => { return article.description; },
      getIcon: () => { return article.icon; },
      getIconColor: () => { return article.iconColor; },
      getUsableWhen: () => { return article.usableWhen || UsableWhen.never },
      getTags: () => { return [...(article.tags||[])]; },
      getRarity: () => { return article.rarity || Rarity.common; },
      getSources: () => { return article.sources || []; },
      getBaseValue: () => { return article.baseValue },
      getValue: () => { return article.value; },
    };
  }

  return {
    register,
    getAllCodes,
    setValue,
    lookup,
  };

})();
