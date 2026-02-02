global.Aspect = (function() {
  const $properties = [_parentId,'code','level'];

  function properties() { return $properties; }

  function validate(id) {
    const aspectComponent = Registry.lookupAspectComponent(id)

    Object.keys(aspectComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Aspect component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,aspectComponent._parentId)
    Validate.isIn('code',aspectComponent.code,['temp']) // TODO: list of aspects
    Validate.atLeast('level',aspectComponent.level,1);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
