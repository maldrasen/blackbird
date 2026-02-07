global.Cock = (function() {
  const $properties = [_parentId,'placement','shape','length','width','flaccidLength','knotRatio','knotFlare',
    'headFlare','testicleWidth','cumVolume','description'];

  function properties() { return $properties; }

  function validate(id) {
    const cockComponent = Registry.lookupCockComponent(id);

    Object.keys(cockComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Cock component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,cockComponent._parentId);
    Validate.exists('placement',cockComponent.placement);
    Validate.atLeast('length',cockComponent.length,24);
    Validate.atLeast('width',cockComponent.width,12);
    Validate.isIn('shape',cockComponent.shape,Object.keys(CockData.CockShapes));
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
