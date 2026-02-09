global.SexualPreferenceComponent = (function() {
  const $properties = [_parentId,'type','value'];

  function getProperties() { return $properties; }

  function validate(id) {
    const sexualPreferenceComponent = Registry.lookupSexualPreferenceComponent(id)

    Object.keys(sexualPreferenceComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Sexual preference component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,sexualPreferenceComponent._parentId);
    Validate.isIn('type',sexualPreferenceComponent.type,SexualPreferenceRecord.getAllCodes());
    Validate.between('value',sexualPreferenceComponent.value,-100,100);
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
