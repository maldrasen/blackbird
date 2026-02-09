global.BodyComponent = (function() {
  const $properties = [
    'height',
    'skinType',
    'scaleColor',
    'skinColor',
    'hairColor',
    'eyeColor',
    'eyeShape',
    'earShape',
    'tailShape',
    'hornShape',
    'bodySmell',
    'description'
  ];

  function getProperties() { return $properties; }

  function validate(id) {
    const bodyComponent = Registry.lookupBodyComponent(id)

    Object.keys(bodyComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Body component does not have a ${key} property.`
      }
    });

    Validate.atLeast('height',bodyComponent.height,300);
    Validate.exists('skinType',bodyComponent.skinType);
    Validate.isIn('eyeColor',bodyComponent.eyeColor,BodyData.EyeColors);
    Validate.isIn('eyeShape',bodyComponent.eyeShape,BodyData.EyeShapes);
    Validate.isIn('bodySmell',bodyComponent.bodySmell,BodyData.AllSmells);

    // Bodies will either have scales, or will have skin and hair. Fur covered bodies use the skin color for skin
    // covered body parts, dicks mostly.
    if (bodyComponent.skinType === 'scales') {
      Validate.isIn('scaleColor',bodyComponent.scaleColor,BodyData.ScaleColors);
    } else {
      Validate.isIn('skinColor',bodyComponent.skinColor,BodyData.HumanSkinTones);
      Validate.isIn('hairColor',bodyComponent.hairColor,BodyData.HairColors);
    }

    if (bodyComponent.eyeShape) { Validate.isIn('earShape',bodyComponent.eyeShape,BodyData.EyeShapes); }
    if (bodyComponent.tailShape) { Validate.isIn('tailShape',bodyComponent.tailShape,BodyData.TailShapes); }
    if (bodyComponent.hornShape) { Validate.isIn('hornShape',bodyComponent.hornShape,BodyData.HornShapes); }
  }

  function createWrapper(argument) {
    const body = argument.data || Registry.lookupBodyComponent(argument.id);

    // Confusingly mouth and throat are on the body component because they're height based.
    //   Mouth Depth = 80mm on a 1620mm high body.
    //   Throat Depth = 300mm on a 1620mm high body.
    // On deep throat actions the actor will feel their esophagus being pushed down, but
    // finally penetrated at the max throat depth, which on a human is around 15 inches.

    function getMouthDepth() { return Math.round(body.height * 0.05); }
    function getThroatDepth() { return Math.round(body.height * 0.185); }
    function getTotalDepth() { return getMouthDepth() + getThroatDepth(); }

    return Object.freeze({
      getMouthDepth,
      getThroatDepth,
      getTotalDepth,
    });
  }

  return Object.freeze({
    getProperties,
    validate,
    createWrapper,
  });

})();
