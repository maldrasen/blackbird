global.Cock = (function() {
  const $properties = [_parentId,'placement','count','shape','length','width','flaccidLength','headFlare','knotFlare',
    'shaftFlare','lengthFlare','knotRatio','bumpSize','spineSize','ridgeSize','testicleSize','testicleCount',
    'cumVolume'];

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
    Validate.atLeast('count',cockComponent.count,1);
    Validate.atLeast('testicleCount',cockComponent.testicleCount,2);
    Validate.isIn('shape',cockComponent.shape,Object.keys(CockData.CockShapes))
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
