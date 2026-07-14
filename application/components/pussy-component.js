global.PussyComponent = (function() {
  const properties = [
    _parentId,
    'placement',
    'shape',
    'minPussyWidth',
    'maxPussyWidth',
    'maxPussyDepth',
    'minCervixWidth',
    'maxCervixWidth',
    'minUrethraWidth',
    'maxUrethraWidth',
    'clitLength',
    'clitWidth',
    'innerLabiaLength',
    'outerLabiaSize',
    'prolapseLength'
  ];

  function create(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.pussy, { _parentId:id, ...data});
    validate(entity);
    return entity;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.pussy,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.pussy);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.pussy);
  }

  function validate(id) {
    const pussyComponent = lookup(id);

    Object.keys(pussyComponent).forEach(key => {
      if (properties.includes(key) === false) {
        throw new Error(`Pussy component does not have a ${key} property.`);
      }
    });

    if (withPlacement(pussyComponent._parentId,pussyComponent.placement).length > 1) {
      throw new Error(`Each pussy should have a unique placement.`);
    }

    Validate.exists('Pussy._parentId',pussyComponent._parentId);
    Validate.exists('Pussy.placement',pussyComponent.placement);
    Validate.isIn('Pussy.shape',pussyComponent.shape,PussyData.PussyShapes);
    Validate.atLeast('Pussy.maxPussyWidth',pussyComponent.maxPussyWidth,32);
    Validate.atLeast('Pussy.maxPussyDepth',pussyComponent.maxPussyDepth,32);
    Validate.atLeast('Pussy.maxUrethraWidth',pussyComponent.maxUrethraWidth,2);
  }

  function belongsTo(parent) {
    return Registry.findComponentsWith(ComponentType.pussy, pussyData => {
      return pussyData[_parentId] === parent;
    });
  }

  function withPlacement(parent, placement) {
    return belongsTo(parent).filter(id => placement === lookup(id).placement);
  }

  // Used to get the single normal pussy component, given a parent.
  function lookupNormalOf(parent) {
    return lookup(withPlacement(parent,'normal')[0]);
  }

  return Object.freeze({
    hasParent: () => { return true; },
    create,
    update,
    lookup,
    destroy,
    lookupNormalOf,
  });

})();
