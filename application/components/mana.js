global.Mana = (function() {
  const $properties = [];

  function properties() { return $properties; }

  function validate(id) {
    const manaComponent = Registry.lookupManaComponent(id)

    Object.keys(manaComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Mana component does not have a ${key} property.`
      }
    });
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
