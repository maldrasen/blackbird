global.CockComponent = (function() {
  const $properties = [
    _parentId,
    'placement',
    'count',
    'size',
    'shape',
    'length',
    'width',
    'minUrethraWidth',
    'maxUrethraWidth',
    'flaccidLength',
    'knotRatio',
    'knotFlare',
    'headFlare',
    'testicleWidth',
    'cumVolume',
    'description'
  ];

  function create(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.cock, { _parentId:id, ...data});
    validate(entity);
    return entity;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.cock,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.cock);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.cock);
  }

  function validate(id) {
    const cockComponent = lookup(id);

    Object.keys(cockComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw new Error(`Cock component does not have a ${key} property.`);
      }
    });

    if (withPlacement(cockComponent._parentId,cockComponent.placement).length > 1) {
      throw new Error(`Each cock should have a unique placement.`);
    }

    Validate.exists(`Cock._parentId`,cockComponent._parentId);
    Validate.exists('Cock.placement',cockComponent.placement);
    Validate.atLeast('Cock.count', cockComponent.count, 1);
    Validate.isIn('Cock.size',cockComponent.size,Object.keys(CockData.CockSizes));
    Validate.isIn('Cock.shape',cockComponent.shape,Object.keys(CockData.CockShapes));
    Validate.atLeast('Cock.length',cockComponent.length,24);
    Validate.atLeast('Cock.width',cockComponent.width,12);
  }

  function belongsTo(parent) {
    return Registry.findComponentsWith(ComponentType.cock, cockData => {
      return cockData[_parentId] === parent;
    });
  }

  function withPlacement(parent, placement) {
    return belongsTo(parent).filter(id => placement === lookup(id).placement);
  }

  // Used to get the single normal cock component, given a parent.
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
