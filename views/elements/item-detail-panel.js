global.ItemDetailPanel = function() {
  let panelElement;

  // Create and return a panel element;
  function build() {
    panelElement = X.createElement(`<div class='item-detail-panel'></div>`);
    return panelElement;
  }

  function update(selected) {
    X.empty(panelElement);

    if (selected) {
      console.log("Show details for ",selected);
    }
  }

  return {
    build,
    update,
  }
}
