Record.define('Ammunition', {

  // The article fields are registered as an Article, so only what makes the ammunition different is stored here.
  register: (code, data) => {
    const { damageTypes, effects, stories, ...articleData } = data;

    Article.register(code, { ...articleData, type:ArticleType.ammunition });
    return { damageTypes, effects, stories };
  },

  getInstance: (ammunition, code) => {
    const article = Article.lookup(code);

    return {
      getName: () => { return article.getName(); },
      getDescription: () => { return article.getDescription(); },
      getCategory: () => { return article.getCategory(); },
      getTags: () => { return article.getTags(); },
      getDamageTypes: () => { return { ...ammunition.damageTypes }},
      getEffects: () => { return [...(ammunition.effects||[])]; },
    };
  },
});
