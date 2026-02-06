global.Cock = (function() {
  const $properties = [_parentId,'placement'];

  function properties() { return $properties; }

  function validate(id) {
    const cockComponent = Registry.lookupCockComponent(id);

    Object.keys(cockComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Cock component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,cockComponent._parentId);
    Validate.exists('placement',cockComponent.placement);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
