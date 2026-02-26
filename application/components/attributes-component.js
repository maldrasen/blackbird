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
        throw `Attribute component does not have a ${key} property.`
      }

      Validate.atLeast(`Attributes.strength`, attributeComponent.strength,1);
      Validate.atLeast(`Attributes.dexterity`, attributeComponent.dexterity,1);
      Validate.atLeast(`Attributes.vitality`, attributeComponent.vitality,1);
      Validate.atLeast(`Attributes.intelligence`, attributeComponent.intelligence,1);
      Validate.atLeast(`Attributes.beauty`, attributeComponent.beauty,1);
    });
  }

  // Wrapper classes are used to take a plain JavaScript object and add methods that the component might need. The
  // wrappers should be immutable, only used to access data. They should be temporary too as the underlying data can
  // change without changing the wrapped data.
  //
  // Wrapper can be either be created with the raw component data or the entity id.
  function createWrapper(argument) {
    const attributes = argument.data || lookup(argument.id);

    function getStrength() { return attributes.strength; }
    function getDexterity() { return attributes.dexterity; }
    function getVitality() { return attributes.vitality; }
    function getIntelligence() { return attributes.intelligence; }
    function getBeauty() { return attributes.beauty; }

    // Stamina is entirely vitality based.
    //   Low vitality is 1d10, or around 5, Low stamina is 3000. That's 600 stamina per point of vitality.
    //   Average vitality 3d10, or around 15. Average stamina is 6000. That's 400 stamina per point of vitality.
    //   Max stamina should be 10,000. Max vitality is 100, which is 100 stamina per point.
    // The formula below approximates that curve.
    function getMaxStamina() {
      return -146738.78 / (attributes.vitality + 12.674) + 11302.33
    }

    return Object.freeze({
      getStrength,
      getDexterity,
      getVitality,
      getIntelligence,
      getBeauty,
      getMaxStamina,
    });
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
    createWrapper,
  });

})();
