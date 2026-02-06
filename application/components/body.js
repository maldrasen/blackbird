global.Body = (function() {
  const $properties = ['height','skinType','scaleColor','skinColor','hairColor','eyeColor','eyeShape','earShape',
    'tailShape','hornShape','bodySmell','description'];

  function properties() { return $properties; }

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

  return Object.freeze({
    properties,
    validate,
  });

})();
