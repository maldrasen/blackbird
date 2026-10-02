global.InventoryOverlay = (function() {

  function init() {}

  function open() {
    X.loadDocument('#inventoryOverlay','views/templates/inventory-overlay.html');

    ItemPanel.buildInto('#inventoryOverlay .item-panel');
    ItemDetailPanel.buildInto('#inventoryOverlay .item-detail-panel');
    PartySelectFrame.buildInto('#inventoryOverlay .party-frame');

    update();

    WindowManager.push(InventoryOverlay);
    X.removeClass('#inventoryOverlay','hide');
    X.removeClass('#overlayCover','hide');
  }

  function close() {
    X.empty('#inventoryOverlay');
    X.addClass('#inventoryOverlay','hide');
    X.addClass('#overlayCover','hide');
    WindowManager.remove(InventoryOverlay);
  }

  function update() {
    console.log("Build Panel");
  }

  return {
    init,
    open,
    close,
    update,
  }

})();
