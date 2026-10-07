Record.define('Article', {
  getInstance: article => {

    function getNameType() { return article.nameType || 'common'; }
    function getPluralName() { return article.pluralName || EnglishHelper.pluralize(article.name); }

    function getNameWithQuantity(quantity) {
      const name = (quantity === 1) ? article.name : getPluralName();
      let count = (getNameType() === 'proper' && quantity === 1) ? "" : quantity;
      return `${count} ${name}`.trim();
    }

    return {
      getType: () => { return article.type || ArticleType.article; },
      getCategory: () => { return article.category; },
      getName: () => { return article.name; },
      getNameType,
      getPluralName,
      getNameWithQuantity,
      getDescription: () => { return article.description; },
      getIcon: () => { return article.icon || 'missing.png'; },
      getIconColor: () => { return article.iconColor; },
      getUsableWhen: () => { return article.usableWhen || UsableWhen.never },
      getTags: () => { return [...(article.tags||[])]; },
      getRarity: () => { return article.rarity || Rarity.common; },
      getSources: () => { return article.sources || []; },
      getBaseValue: () => { return article.baseValue },
      getValue: () => { return article.value; },
    };
  },

  // The appraiser writes each article's value onto the stored record once, after everything has been registered.
  functions: records => ({
    setValue: (code, value) => {
      if (records[code].value != null) {
        throw new Error(`The value of article[${code}] has already been appraised.`);
      }
      records[code].value = value;
    },
  }),
});
