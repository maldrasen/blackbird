Record.define('Ammunition', {

  // The article fields are registered as an Article, so only what makes the ammunition different is stored here.
  register: (code, data) => {
    const { damageTypes, enchantment, stories, ...articleData } = data;

    Article.register(code, { ...articleData, type:ArticleType.ammunition });
    return { damageTypes, enchantment, stories };
  },

  validate: (ammunition, code) => {
    if (ammunition.enchantment) {
      Validate.isString(`Ammunition[${code}].enchantment.pattern`, ammunition.enchantment.pattern);
      Validate.isArray(`Ammunition[${code}].enchantment.effects`, ammunition.enchantment.effects);
      Validate.exists(`Ammunition[${code}].enchantment.properties`, ammunition.enchantment.properties);
    }
  },

  getInstance: (ammunition, code) => {
    const article = Article.lookup(code);

    return {
      getName: () => { return article.getName(); },
      getDescription: () => { return article.getDescription(); },
      getCategory: () => { return article.getCategory(); },
      getTags: () => { return article.getTags(); },
      getDamageTypes: () => { return { ...ammunition.damageTypes }},
      hasEnchantment: () => { return ammunition.enchantment != null; },
      getEnchantment: () => { return ammunition.enchantment ? Enchantment(ammunition.enchantment) : null; },
    };
  },
});
