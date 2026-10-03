global.InventoryOverlay = (function() {

  let itemPanel;
  let itemDetailPanel;
  let partySelectFrame;

  function init() {
    X.onClick(`#inventoryOverlay .close-button`, close);
  }

  function open() {
    X.loadDocument('#inventoryOverlay','views/templates/inventory-overlay.html');

    partySelectFrame = PartySelectFrame();
    itemDetailPanel = ItemDetailPanel();
    itemPanel = ItemPanel();

    itemPanel.setDetailPanel(itemDetailPanel);
    itemDetailPanel.setPartySelect(partySelectFrame);
    itemDetailPanel.setItemPanel(itemPanel);

    X.fill('#inventoryOverlay .item-area', itemPanel.build());
    X.fill('#inventoryOverlay .detail-area', itemDetailPanel.build());
    X.fill('#inventoryOverlay .party-area', partySelectFrame.getElement());

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
    partySelectFrame = null;
  }

  return {
    init,
    open,
    close,
  }

})();
