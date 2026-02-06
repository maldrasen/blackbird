global.Mouth = (function() {
  const $properties = [_parentId,'placement'];

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
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
