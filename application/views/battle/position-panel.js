global.PositionPanel = function(side, rank, position) {

  const element = X.createElement(`<div class='position' data-position='${side}.${rank}.${position}'></div>`);

  let entity;
  let entityType;

  function setCombatantPanel(panel) {
    entityType = panel.getType();
    entity = panel.getEntity();

    X.empty(element);
    X.append(element,panel.getElement());
    X.addClass(element,'occupied');
  }

  function clearCombatantPanel() {
    entityType = null;
    entity = null;

    X.empty(element);
    X.removeClass(element,'occupied');
  }

  return Object.freeze({
    getRank: () => { return rank; },
    getPosition: () => { return position; },
    getElement: () => { return element; },
    getEntity: () => { return entity; },
    getEntityType: () => { return entityType; },
    setCombatantPanel,
    clearCombatantPanel,
  });

}