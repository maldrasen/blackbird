global.Memory = (function() {
  const $properties = [_parentId,'time','type','details'];

  function properties() { return $properties; }

  function validate(id) {
    const memoryComponent = Registry.lookupMemoryComponent(id)

    Object.keys(memoryComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Memory component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,memoryComponent._parentId);
    Validate.exists('time',memoryComponent.time);
    Validate.isIn('type',memoryComponent.type,['training','event']);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
