// Options:
//   - `showIcon`     True if the name span should include its icon.
//   - `itemId`       An item entity ID
//   - `articleCode`  An article code
//   - `quantity`     If we include the quantity option, then we need include the quantity and use the article's
//                    getNameWithQuantity() function to get its name. An article without quality shows it's plain name.
//
global.ItemName = function(options={}) {
  let type;
  let item;
  let article;
  let name;
  let icon = '';
  let rarity;

  if (options.itemId) {
    type = 'item';
    item = Item(options.itemId);
    name = item.getName();
    rarity = item.getRarity();
  }

  if (options.articleCode) {
    type = 'article';
    article = Article.lookup(options.articleCode);
    name = (options.quantity == null) ? article.getName() : article.getNameWithQuantity(options.quantity);
    rarity = article.getRarity();
  }

  if (options.showIcon) {
    const image = (type === 'item') ? item.getIcon() : article.getIcon();
    icon = `<span class='item-icon'></span>`
  }

  function asString() {
    return `<span class='item-name ${rarity}'>${icon}${name}</span>`;
  }

  return {
    asElement: () => { return X.createElement(asString()) },
    asString,
  }

}