global.BreastsComponent = (function() {
  const $properties = [
    'breastCount',
    'breastSize',
    'breastFirmness',
    'relativeBreastVolume',
    'absoluteBreastVolume',
    'breastShape',
    'nippleShape',
    'nippleWidth',
    'nippleLength',
    'nippleShade',
    'areolaWidth',
    'lactationFactor',
    'orificeMinWidth',
    'orificeMaxWidth',
    'description'
  ];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.breasts,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.breasts,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.breasts);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.breasts);
  }

  function validate(id) {
    const breastsComponent = lookup(id);

    Object.keys(breastsComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Breasts component does not have a ${key} property.`
      }
    });

    Validate.atLeast('breastCount',breastsComponent.breastCount,2);
    Validate.isIn('breastSize',breastsComponent.breastSize,Object.keys(BreastData.BreastSizes));
    Validate.isIn('breastFirmness',breastsComponent.breastFirmness,Object.keys(BreastData.BreastFirmness));
    Validate.atLeast('relativeBreastVolume',breastsComponent.relativeBreastVolume,0);
    Validate.atLeast('absoluteBreastVolume',breastsComponent.absoluteBreastVolume,0);
    Validate.exists('breastShape',breastsComponent.breastShape);
    Validate.isIn('nippleShape',breastsComponent.nippleShape,Object.keys(BreastData.NippleShapes));
    Validate.atLeast('nippleWidth',breastsComponent.nippleWidth,1);
    Validate.atLeast('nippleLength',breastsComponent.nippleLength,1);
    Validate.between('nippleShade',breastsComponent.nippleShade,0,5);
    Validate.atLeast('areolaWidth',breastsComponent.areolaWidth,1);
    Validate.atLeast('lactationFactor',breastsComponent.lactationFactor,0);
    Validate.atLeast('orificeMinWidth',breastsComponent.orificeMinWidth,0);
    Validate.atLeast('orificeMaxWidth',breastsComponent.orificeMaxWidth,0);
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
