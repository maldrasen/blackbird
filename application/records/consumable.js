global.Consumable = (function() {
  const consumables = {};

  function register(code,data) {
    const { effects, stories, ...articleData } = data;

    Article.register(code, { ...articleData, type:ArticleType.consumable });
    consumables[code] = { effects, stories };
  }

  function lookup(code) {
    if (consumables[code] == null) { throw new Error(`Bad consumable code [${code}]`); }

    const consumable = { ...consumables[code] };
    const article = Article.lookup(code);

    function consume(entity) {
      const context = { A:entity, I:code };
      const results = (consumable.effects||[]).map(effect => { effect(entity); });
      const story = consumable.stories ? consumable.stories.pick(context) : `[TODO: Consumable:${code} story]`;
      return { results, story };
    }

    return {
      getCode: () => { return code; },
      getName: () => { return article.getName(); },
      getDescription: () => { return article.getDescription(); },
      getCategory: () => { return article.getCategory(); },
      getTags: () => { return article.getTags(); },
      getEffects: () => { return [...(consumable.effects||[])]; },
      consume,
    };
  }

  return {
    register,
    lookup,
  };

})();
