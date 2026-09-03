global.Ammunition = (function() {
  const ammunitionRecords = {};

  function register(code,data) {
    const { damageTypes, effects, stories, ...articleData } = data;

    Article.register(code, { ...articleData, type:ArticleType.ammunition });
    ammunitionRecords[code] = { damageTypes, effects, stories };
  }

  function lookup(code) {
    if (ammunitionRecords[code] == null) { throw new Error(`Bad consumable code [${code}]`); }

    const ammunition = { ...ammunitionRecords[code] };
    const article = Article.lookup(code);

    return {
      getCode: () => { return code; },
      getName: () => { return article.getName(); },
      getDescription: () => { return article.getDescription(); },
      getCategory: () => { return article.getCategory(); },
      getTags: () => { return article.getTags(); },
      getDamageTypes: () => { return { ...ammunition.damageTypes }},
      getEffects: () => { return [...(ammunition.effects||[])]; },
      pickStory: context => { return ammunition.stories ? ammunition.stories.pick(context) : null; },
    };
  }

  return {
    register,
    lookup,
  };

})();
