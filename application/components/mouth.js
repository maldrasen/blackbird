global.Mouth = (function() {
  const $properties = [_parentId,'placement','maxMouthWidth','maxThroatWidth','comfortableThroatDepth','tongueLength',
    'tongueShape'];

  function properties() { return $properties; }

  function validate(id) {
    const mouthComponent = Registry.lookupMouthComponent(id);

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
    Validate.exists('tongueShape',mouthComponent.placement);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
