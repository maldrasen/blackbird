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

  function create(id,data) {
    Registry.createComponent(id,ComponentType.body,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.body,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.body);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.body);
  }

  function validate(id) {
    const bodyComponent = lookup(id)

    Object.keys(bodyComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Body component does not have a ${key} property.`
      }
    });

    Validate.atLeast('Body.height',bodyComponent.height,300);
    Validate.exists('Body.skinType',bodyComponent.skinType);
    Validate.isIn('Body.eyeColor',bodyComponent.eyeColor,BodyData.EyeColors);
    Validate.isIn('Body.eyeShape',bodyComponent.eyeShape,BodyData.EyeShapes);
    Validate.isIn('Body.bodySmell',bodyComponent.bodySmell,BodyData.AllSmells);

    // Bodies will either have scales, or will have skin and hair. Fur covered bodies use the skin color for skin
    // covered body parts, dicks mostly.
    if (bodyComponent.skinType === 'scales') {
      Validate.isIn('Body.scaleColor',bodyComponent.scaleColor,BodyData.ScaleColors);
    } else {
      Validate.isIn('Body.skinColor',bodyComponent.skinColor,BodyData.HumanSkinTones);
      Validate.isIn('Body.hairColor',bodyComponent.hairColor,BodyData.HairColors);
    }

    if (bodyComponent.eyeShape) { Validate.isIn('Body.earShape',bodyComponent.eyeShape,BodyData.EyeShapes); }
    if (bodyComponent.tailShape) { Validate.isIn('Body.tailShape',bodyComponent.tailShape,BodyData.TailShapes); }
    if (bodyComponent.hornShape) { Validate.isIn('Body.hornShape',bodyComponent.hornShape,BodyData.HornShapes); }
  }

  function createWrapper(argument) {
    const body = argument.data || lookup(argument.id);

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
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
    createWrapper,
  });

})();
