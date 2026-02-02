global.Attributes = (function() {
  const $properties = ['strength','dexterity','vitality','intelligence','beauty'];

  function properties() { return $properties; }

  function validate(id) {
    const attributeComponent = Registry.lookupAttributesComponent(id)

    Object.keys(attributeComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Attribute component does not have a ${key} property.`
      }

      Validate.atLeast('strength',attributeComponent.strength,1);
      Validate.atLeast('dexterity',attributeComponent.dexterity,1);
      Validate.atLeast('vitality',attributeComponent.vitality,1);
      Validate.atLeast('intelligence',attributeComponent.intelligence,1);
      Validate.atLeast('beauty',attributeComponent.beauty,1);
    });
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
