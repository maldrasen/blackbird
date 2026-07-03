global.MouthComponent = (function() {
  const $properties = [_parentId,'placement','maxMouthWidth','maxThroatWidth','comfortableThroatDepth','tongueLength',
    'tongueShape'];

  function create(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.mouth, { _parentId:id, ...data});
    validate(entity);
    return entity;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.mouth,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.mouth);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.mouth);
  }

  function validate(id) {
    const mouthComponent = lookup(id);

    Object.keys(mouthComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw new Error(`Mouth component does not have a ${key} property.`);
      }
    });

    if (withPlacement(mouthComponent._parentId,mouthComponent.placement).length > 1) {
      throw new Error(`Each mouth should have a unique placement.`);
    }

    Validate.exists(_parentId,mouthComponent._parentId);
    Validate.exists('Mouth.placement',mouthComponent.placement);
    Validate.atLeast('Mouth.maxMouthWidth',mouthComponent.maxMouthWidth,32);
    Validate.atLeast('Mouth.maxThroatWidth',mouthComponent.maxThroatWidth,26);
    Validate.atLeast('Mouth.comfortableThroatDepth',mouthComponent.comfortableThroatDepth,0);
    Validate.atLeast('Mouth.tongueLength',mouthComponent.tongueLength,50);
    Validate.isIn('Mouth.tongueShape',mouthComponent.tongueShape,MouthData.TongueShapes);
  }

  function belongsTo(parent) {
    return Registry.findComponentsWith(ComponentType.mouth, mouthData => {
      return mouthData[_parentId] === parent;
    });
  }

  function withPlacement(parent, placement) {
    return belongsTo(parent).filter(id => placement === lookup(id).placement);
  }

  // Used to get the single normal 'face' mouth component, given a parent.
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
