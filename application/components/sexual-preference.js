global.SexualPreference = (function() {
  const $properties = [_parentId,'type','value'];

  function properties() { return $properties; }

  function validate(id) {
    const sexualPreferenceComponent = Registry.lookupSexualPreferenceComponent(id)

    Object.keys(sexualPreferenceComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Sexual preference component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,sexualPreferenceComponent._parentId);
    Validate.isIn('type',sexualPreferenceComponent.type,['gynophilic','androphilic']); // TODO: Actual List of sexual preferences
    Validate.between('value',sexualPreferenceComponent.value,-100,100);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
