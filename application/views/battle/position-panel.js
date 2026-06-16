global.PositionPanel = function(side, rank, position) {

  let entity;
  let entityType;

  const element = X.createElement(`<div class='position' data-position='${side}.${rank}.${position}'></div>`);
  const captiveEntities = [];

  function setEntity(type, id) {
    Validate.isIn('PositionPanel.entityType',type,['monster','character']);
    Validate.exists('PositionPanel.entity',id);
    X.addClass(element,'occupied');
    entityType = type;
    entity = id;
  }

  function clearEntity() {
    X.removeClass(element,'occupied');
    entityType = null;
    entity = null;
  }

  return Object.freeze({
    getRank: () => { return rank; },
    getPosition: () => { return position; },
    getElement: () => { return element; },
    getEntity: () => { return entity; },
    getEntityType: () => { return entityType; },
    setEntity,
    clearEntity,
  });

}