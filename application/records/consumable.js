Record.define('Consumable', {

  // The article fields are registered as an Article, so only what makes the consumable different is stored here.
  register: (code, data) => {
    const { effects, stories, onUse, target, areaOfEffect, messageForEntity, ...articleData } = data;

    Article.register(code, { ...articleData, type:ArticleType.consumable });
    return { effects, stories, onUse, target, areaOfEffect, messageForEntity };
  },

  validate: (consumable, code) => {
    const article = Article.lookup(code);
    const onUse = consumable.onUse;

    if (onUse == null && [UsableWhen.anyTime, UsableWhen.outOfCombat].includes(article.getUsableWhen())) {
      throw new Error(`Consumable[${code}] is invalid. A consumable that can be used outside of combat must have a onUse property.`);
    }

    if (onUse) {
      let valid = false;
      if (onUse.storyInAlert) { valid = consumable.stories != null; }
      if (onUse.storyInOverlay) { valid = consumable.stories != null; }
      if (onUse.showAlert) { valid = true; }
      if (onUse.startEpisode) { valid = true; }
      if (valid === false) { throw new Error(`Consumable[${code}] has an invalid onUse: ${JSON.stringify(onUse)}`); }
    }
  },

  getInstance: (consumable, code) => {
    const article = Article.lookup(code);

    return {
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
  },
});
