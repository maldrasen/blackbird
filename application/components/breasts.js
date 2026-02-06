global.Breasts = (function() {
  const $properties = ['breastCount','breastSize','breastFirmness','relativeBreastVolume','absoluteBreastVolume',
    'breastShape','nippleShape','nippleWidth','nippleLength','nippleShade','areolaWidth','lactationFactor',
    'orificeMinWidth','orificeMaxWidth','description'];

  function properties() { return $properties; }

  function validate(id) {
    const breastsComponent = Registry.lookupBreastsComponent(id);

    Object.keys(breastsComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Breasts component does not have a ${key} property.`
      }
    });

    Validate.atLeast('breastCount',breastsComponent.breastCount,2)
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
