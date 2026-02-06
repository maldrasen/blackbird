global.Pussy = (function() {
  const $properties = [_parentId,'placement'];

  function properties() { return $properties; }

  function validate(id) {
    const pussyComponent = Registry.lookupPussyComponent(id);

    Object.keys(pussyComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Pussy component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,pussyComponent._parentId);
    Validate.exists('placement',pussyComponent.placement);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
