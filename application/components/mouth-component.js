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
        throw `Mouth component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,mouthComponent._parentId);
    Validate.exists('placement',mouthComponent.placement);
    Validate.atLeast('maxMouthWidth',mouthComponent.maxMouthWidth,32);
    Validate.atLeast('maxThroatWidth',mouthComponent.maxThroatWidth,26);
    Validate.atLeast('comfortableThroatDepth',mouthComponent.tongueLength,0);
    Validate.atLeast('tongueLength',mouthComponent.tongueLength,50);
    Validate.isIn('tongueShape',mouthComponent.tongueShape,MouthData.TongueShapes);
  }

  return Object.freeze({
    hasParent: () => { return true; },
    create,
    update,
    lookup,
    destroy,
  });

})();
