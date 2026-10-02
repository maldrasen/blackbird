global.ItemPanel = function() {
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

  function buildArticle(entry) {
    const icon = entry.icon ? `[${entry.icon}]` : '';

    return X.createElement(`<li data-code='${entry.articleCode}'>${icon} ${entry.quantity} ${entry.name}</li>`);
  }

  function buildItem(item) {
    // TODO
  }

  return {
    build,
    update,
  }
}
