global.Mana = (function() {
  const $properties = ['red_mana','yellow_mana','green_mana','blue_mana','black_mana'];

  function getProperties() { return $properties; }

  function validate(id) {
    const manaComponent = Registry.lookupManaComponent(id)

    Object.keys(manaComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Mana component does not have a ${key} property.`
      }
    });
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
