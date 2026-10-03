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

    function getNameType() { return article.nameType || 'common'; }
    function getPluralName() { return article.pluralName || EnglishHelper.pluralize(article.name); }

    function getNameWithQuantity(quantity) {
      const name = (quantity === 1) ? article.name : getPluralName();
      let count = (getNameType() === 'proper' && quantity === 1) ? "" : quantity;
      return `${count} ${name}`.trim();
    }

    return {
      getCode: () => { return code; },
      getType: () => { return article.type || ArticleType.article; },
      getCategory: () => { return article.category; },
      getName: () => { return article.name; },
      getNameType,
      getPluralName,
      getNameWithQuantity,
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
