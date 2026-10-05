// Options:
//   - `showIcon`     True if the name span should include its icon.
//   - `itemId`       An item entity ID
//   - `articleCode`  An article code
//   - `size`         [small,large] The size of the name and icon, defaults to small.
//   - `quantity`     If we include the quantity option, then we need include the quantity and use the article's
//                    getNameWithQuantity() function to get its name. An article without quality shows it's plain name.
//
global.ItemName = function(options={}) {
  let type;
  let item;
  let article;
  let name;
  let icon = '';
  let size = options.size || 'small'
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

  // The icons are white shapes on a transparent background, so the image is used as a mask over the current text
  // color. That way the icon always matches the rarity color of the name.
  if (options.showIcon) {
    const image = (type === 'item') ? item.getIcon() : article.getIcon();
    icon = `<span class='item-icon' style="mask-image:${X.assetURL(`icons/${image}`)}"></span>`;
  }

  function asString() {
    return `<span class='item-name ${size} ${rarity}'>${icon}${name}</span>`;
  }

  return {
    asElement: () => { return X.createElement(asString()) },
    asString,
  }

}