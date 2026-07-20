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

  // An attribute check is a very simplified version of a skill check. Unlike the skill checks, attribute checks don't
  // have crits or fumbles, they only work off of a single attribute, and don't have any factors like the skill factor.
  function check(id, attribute) {
    const value = lookup(id)[attribute];
    const plus = Math.floor(value * 0.25);
    const rand = Math.ceil(value * 0.75);
    return Random.between(1,rand) + plus
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

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
    check,
  });

})();
