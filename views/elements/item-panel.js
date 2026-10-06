global.ItemPanel = function() {
  let detailPanel;
  let panelElement;
  let itemList;
  let selected;

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
    selected = null;
    Inventory().listItems().forEach(entry => {
      itemList.appendChild(entry.articleCode ? buildArticle(entry.articleCode, entry.quantity): buildItem(entry.itemId));
    });
  }

  // Displaying an article will show the quantity of the article only if that article doesn't have a proper name.
  // Theoretically this is to handle special items like quest rewards that don't need to full item components, but
  // aren't something you'd actually find more than one of. We don't want to display a name like "1 The One Ring"
  // I added "The Milk of Human Kindness" partially as a joke, partially as a Fallout reference, and because we need a
  // human mutagen. It's a rare case though that acts like a proper name (it starts with "The") but has a plural form
  // that kind of works. (2 Milks of Human Kindness is also kind of funny)
  function buildArticle(code, quantity) {
    const element = buildEntry(ItemName({ articleCode:code, quantity:quantity, showIcon:true }));
    element.dataset.type = 'article';
    element.dataset.code = code;
    return element;
  }

  function buildItem(id) {
    const element = buildEntry(ItemName({ itemId:id, showIcon:true }));
    element.dataset.type = 'item';
    element.dataset.id = id;
    return element;
  }

  function buildEntry(itemName) {
    const element = X.createElement(`<li>${itemName.asString()}</li>`);
    element.addEventListener('click', event => { selectItem(event.currentTarget); });
    return element;
  }

  function selectItem(element) {

    if (element == null || element === selected) {
      if (element) { X.removeClass(element,'selected'); }
      if (detailPanel) { detailPanel.update(null); }
      selected = null;
      return;
    }

    selected = element;

    const previous = element.parentElement.querySelector('.selected');
    if (previous) {
      X.removeClass(previous,'selected')
    }

    X.addClass(selected, 'selected');

    if (detailPanel) {
      detailPanel.update(selected.dataset.type === 'item' ? { id:selected.dataset.id } : { code:selected.dataset.code });
    }
  }

  function selectArticle(code) {
    selectItem(itemList.querySelector(`li[data-code='${code}']`));
  }

  // Stepping off either end of the list stays put. With nothing selected, down starts at the top and up at the bottom.
  // The entry at the edge is already selected when a step is clamped, and selecting it again would deselect it.
  function moveSelection(delta) {
    const entries = Array.from(itemList.children);
    if (entries.length === 0) { return; }

    const current = entries.indexOf(selected);
    const start = (current >= 0) ? current : (delta > 0 ? -1 : entries.length);
    const next = Math.min(Math.max(start + delta, 0), entries.length - 1);

    if (entries[next] !== selected) { selectItem(entries[next]); }
    selected.scrollIntoView({ block:'nearest' });
  }

  return {
    build,
    update,
    selectArticle,
    moveSelection,
    setDetailPanel: panel => { detailPanel = panel; },
  }
}
