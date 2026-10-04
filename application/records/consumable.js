global.Consumable = (function() {
  const consumables = {};

  function register(code,data) {
    const {
      effects,
      stories,
      onUse,
      target,
      areaOfEffect,
      messageForEntity,
      ...articleData
    } = data;

    Article.register(code, { ...articleData, type:ArticleType.consumable });
    consumables[code] = { effects, stories, onUse, target, areaOfEffect, messageForEntity };

    validate(code);
  }

  function validate(code) {
    const article = Article.lookup(code);
    const consumable = consumables[code];
    const onUse = consumable.onUse;

    if (onUse == null && [UsableWhen.anyTime, UsableWhen.outOfCombat].includes(article.getUsableWhen())) {
      throw new Error(`Consumable[${code}] is invalid. A consumable that can be used outside of combat must have a onUse property.`);
    }

    if (onUse) {
      let valid = false;
      if (onUse.storyInAlert) { valid = consumable.stories != null; }
      if (onUse.storyInOverlay) { valid = consumable.stories != null; }
      if (onUse.showAlert) { valid = true; }
      if (valid === false) { throw new Error(`Consumable[${code}] has an invalid onUse: ${JSON.stringify(onUse)}`); }
    }
  }

  function lookup(code) {
    if (consumables[code] == null) { throw new Error(`Bad consumable code [${code}]`); }

    const consumable = { ...consumables[code] };
    const article = Article.lookup(code);

    return {
      getCode: () => { return code; },
      getName: () => { return article.getName(); },
      getDescription: () => { return article.getDescription(); },
      getCategory: () => { return article.getCategory(); },
      getTags: () => { return article.getTags(); },
      hasEffects: () => { return consumable.effects != null },
      getEffects: () => { return consumable.effects ? [...consumable.effects] : null; },
      getTarget: () => { return consumable.target || EffectTarget.self; },
      getAreaOfEffect: () => { return consumable.areaOfEffect || null; },
      getOnUse: () => { return consumable.onUse; },
      hasStories: () => { return consumable.stories != null },
      pickStory: context => { return consumable.stories ? consumable.stories.pick(context) : null; },
      messageForEntity: (id,results) => { return consumable.messageForEntity ? consumable.messageForEntity(id,results) : null; },
    };
  }

  return {
    register,
    lookup,
  };

})();
