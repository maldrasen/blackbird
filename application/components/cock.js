global.Cock = (function() {
  const $properties = [
    _parentId,
    'placement',
    'count',
    'size',
    'shape',
    'length',
    'width',
    'minUrethraWidth',
    'maxUrethraWidth',
    'flaccidLength',
    'knotRatio',
    'knotFlare',
    'headFlare',
    'testicleWidth',
    'cumVolume',
    'description'
  ];

  function getProperties() { return $properties; }

  function validate(id) {
    const cockComponent = Registry.lookupCockComponent(id);

    Object.keys(cockComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Cock component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,cockComponent._parentId);
    Validate.exists('placement',cockComponent.placement);
    Validate.atLeast('count', cockComponent.count, 1);
    Validate.isIn('size',cockComponent.size,Object.keys(CockData.CockSizes));
    Validate.isIn('shape',cockComponent.shape,Object.keys(CockData.CockShapes));
    Validate.atLeast('length',cockComponent.length,24);
    Validate.atLeast('width',cockComponent.width,12);
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
