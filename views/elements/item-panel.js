global.ItemPanel = function() {
  let detailPanel;
  let panelElement;
  let itemList;

  // Create and return a list element.
  function build() {
    itemList = X.createElement(`<ul class='item-list'></ul>`);
    panelElement = X.createElement(`<div class='item-panel'></div>`);
    panelElement.appendChild(itemList);

    update();

    return panelElement;
  }

  // I can't think of a time when we would ever show an inventory other than the shared party inventory. Though we
  // have other inventories, like the equipment depots, they're never displayed to players.
  function update() {
    X.empty(itemList);
    Inventory().listItems().forEach(entry => {
      itemList.appendChild(entry.articleCode ? buildArticle(entry): buildItem(entry));
    });
  }

  // Displaying an article will show the quantity of the article only if that article doesn't have a proper name.
  // Theoretically this is to handle special items like quest rewards that don't need to full item components, but
  // aren't something you'd actually find more than one of. We don't want to display a name like "1 The One Ring"
  // I added "The Milk of Human Kindness" partially as a joke, partially as a Fallout reference, and because we need a
  // human mutagen. It's a rare case though that acts like a proper name (it starts with "The") but has a plural form
  // that kind of works. (2 Milks of Human Kindness is also kind of funny)
  function buildArticle(entry) {
    const article = Article.lookup(entry.articleCode);
    const icon = article.getIcon() ? `[${article.getIcon()}]` : '';
    const name = (entry.quantity === 1) ? article.getName() : article.getPluralName();
    const quantity = (article.getNameType() === 'common') ? entry.quantity : '';

    return X.createElement(`<li data-type='article' data-code='${entry.articleCode}'>${icon} ${quantity} ${name}</li>`);
  }

  function buildItem(entry) {
    const item = Item(entry.itemId);
    const icon = item.getIcon() ? `[${item.getIcon()}]` : '';
    return X.createElement(`<li data-type='item' data-id='${entry.itemId}'>${icon} ${item.getName()}</li>`);
  }

  return {
    build,
    update,
    setDetailPanel: panel => { detailPanel = panel; },
  }
}
