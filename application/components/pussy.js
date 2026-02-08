global.Pussy = (function() {
  const $properties = [
    _parentId,
    'placement',
    'shape',
    'minPussyWidth',
    'maxPussyWidth',
    'maxPussyDepth',
    'minCervixWidth',
    'maxCervixWidth',
    'minUrethraWidth',
    'maxUrethraWidth',
    'clitLength',
    'clitWidth',
    'innerLabiaLength',
    'outerLabiaSize',
    'prolapseLength'
  ];

  function properties() { return $properties; }

  function validate(id) {
    const pussyComponent = Registry.lookupPussyComponent(id);

    Object.keys(pussyComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Pussy component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,pussyComponent._parentId);
    Validate.exists('placement',pussyComponent.placement);
    Validate.isIn('shape',pussyComponent.shape,PussyData.PussyShapes);
    Validate.atLeast('maxPussyWidth',pussyComponent.maxPussyWidth,32);
    Validate.atLeast('maxPussyDepth',pussyComponent.maxPussyWidth,32);
    Validate.atLeast('maxUrethraWidth',pussyComponent.maxPussyWidth,2);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
