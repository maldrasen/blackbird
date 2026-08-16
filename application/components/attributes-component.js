global.AttributesComponent = (function() {

  function create(id,data) {
    Registry.createComponent(id,ComponentType.attributes,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.attributes,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.attributes);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.attributes);
  }

  function validate(id) {
    const attributes = Object.keys(Attrib);
    const attributeComponent = lookup(id);

    Object.keys(attributeComponent).forEach(key => {
      if (attributes.includes(key) === false) {
        throw new Error(`Attribute component does not have a ${key} property.`);
      }

      Validate.atLeast(`Attributes.strength`, attributeComponent.strength,1);
      Validate.atLeast(`Attributes.dexterity`, attributeComponent.dexterity,1);
      Validate.atLeast(`Attributes.vitality`, attributeComponent.vitality,1);
      Validate.atLeast(`Attributes.intelligence`, attributeComponent.intelligence,1);
      Validate.atLeast(`Attributes.beauty`, attributeComponent.beauty,1);
    });
  }

  return {
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  };

})();
