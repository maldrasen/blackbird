global.InventoryOverlay = (function() {

  let itemPanel;
  let itemDetailPanel;
  let partySelectFrame;

  function init() {
    X.onClick(`#inventoryOverlay .close-button`, close);
  }

  function open() {
    X.loadDocument('#inventoryOverlay','views/templates/inventory-overlay.html');

    itemPanel = ItemPanel();
    itemDetailPanel = ItemDetailPanel();
    partySelectFrame = PartySelectFrame();

    X.fill('#inventoryOverlay .item-area', itemPanel.build());
    X.fill('#inventoryOverlay .detail-area', itemDetailPanel.build());
    X.fill('#inventoryOverlay .party-area', partySelectFrame.build());

    WindowManager.push(InventoryOverlay);
    X.removeClass('#inventoryOverlay','hide');
    X.removeClass('#overlayCover','hide');
  }

  function close() {
    X.empty('#inventoryOverlay');
    X.addClass('#inventoryOverlay','hide');
    X.addClass('#overlayCover','hide');
    WindowManager.remove(InventoryOverlay);

    itemPanel = null;
    itemDetailPanel = null;
  }

  return {
    init,
    open,
    close,
  }

})();
