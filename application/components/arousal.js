global.Arousal = (function() {
  const $properties = ['arousal','pleasure','edging','refectory'];

  function properties() { return $properties; }

  function validate(id) {
    const arousalComponent = Registry.lookupArousalComponent(id)

    Object.keys(arousalComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Arousal component does not have a ${key} property.`
      }
    });

    Validate.atLeast('arousal',arousalComponent.arousal,0);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
