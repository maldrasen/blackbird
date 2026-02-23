global.CharacterBodyPanel = (function() {

  // TODO: Once we have gaping and prolapsed anuses, this will need to expand (how like an anus)
  function fillAnus(id) {
    const anus = AnusComponent.lookupNormalOf(id);
    const list = ListBuilder('ul','two-columns');

    let shape = 'A Normal Looking Asshole'
    if (anus.shape === 'puffy') { shape = `A Puffy, Slightly Protruding, Asshole` }
    if (anus.shape === 'wrinkled') { shape = `A Wide and Deeply Wrinkled Asshole` }
    if (anus.shape === 'horse') { shape = `A Thick, Donut Shaped, Horse Asshole` }

    list.add(`<li>Shape</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(shape)}</li>`);
    list.add(`<li>Max Width</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(MeasurementHelper.inchesWithFractions(anus.maxWidth,true))}</li>`);

    X.fill('#characterOverlay .anus-area',X.createElement(list.getList()))
  }

  // I'll combine the body and the mouth as I don't want to display stuff like
  // the comfortableThroatDepth. Tongue shape and length are the only 'visible'
  // parameters I'll display.
  function fillBody(id) {
    const body = BodyComponent.lookup(id);
    const mouth = MouthComponent.lookupNormalOf(id);
    const list = ListBuilder('ul','two-columns');

    let eyes = StringHelper.titlecaseAll(body.eyeColor);
    switch (body.eyeShape) {
      case 'dragon': eyes += ' and Reptilian'; break;
      case 'cat': eyes += ' and Feline'; break;
      case 'heart': eyes += ' and Heart ♥ Shaped'; break;
    }

    list.add(`<li>Height</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(MeasurementHelper.feetAndInchesInEnglish(body.height))} Tall</li>`);

    if (body.hairColor) {
      list.add(`<li>Hair Color</li>`);
      list.add(`<li class='fg-hair-color-${body.hairColor}'>${StringHelper.titlecaseAll(body.hairColor)}</li>`);
    }
    if (body.eyeColor) {
      list.add(`<li>Eye Color</li>`);
      list.add(`<li class='fg-eye-color-${body.eyeColor}'>${eyes}</li>`)
    }
    if (body.furColor) {
      list.add(`<li>Fur Color</li>`);
      list.add(`<li class='fg-hair-color-${body.furColor}'>${StringHelper.titlecaseAll(body.furColor)}</li>`);
    }
    if (body.scaleColor) {
      list.add(`<li>Scale Color</li>`);
      list.add(`<li class='fg-scale-color-${body.scaleColor}'>${StringHelper.titlecaseAll(body.scaleColor)}</li>`);
    }
    if (body.skinColor) {
      list.add(`<li>Skin Color</li>`);
      list.add(`<li class='fg-skin-color-${body.skinColor}'>${StringHelper.titlecaseAll(body.skinColor)}</li>`);
    }

    if (body.earShape && body.earShape !== 'human') {
      list.add(`<li>Ears</li>`);
      list.add(`<li>${StringHelper.titlecaseAll(body.earShape)} Ears</li>`)
    }
    if (body.tailShape) {
      list.add(`<li>Tail</li>`);
      list.add(`<li>${StringHelper.titlecaseAll(body.tailShape)} Tail</li>`)
    }
    if (body.hornShape) {
      list.add(`<li>Horns</li>`);
      list.add(`<li>${StringHelper.titlecaseAll(body.hornShape)} Horns</li>`)
    }

    let tongue = MeasurementHelper.inchesWithFractions(mouth.tongueLength);
    if (mouth.tongueShape === 'forked') { tongue = `Forked and ${tongue}` }
    if (mouth.tongueShape === 'dog') { tongue = `Wide, Flat, and ${tongue}` }

    list.add(`<li>Tongue</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(tongue)} Long</li>`);

    X.fill('#characterOverlay .body-area',X.createElement(list.getList()))
  }

  // I think I'll improve this function later, after the breast describer has
  // been finished. I should be writing a short version of the breast
  // descriptions there that I'll use instead of the Size, Firmness, Shape rows
  // below. The lactation, nipple shade, and nipple orifice details will need
  // to be improved as well. (Use skin color for nipple shades?)
  function fillBreasts(id) {
    const breasts = BreastsComponent.lookup(id);
    const list = ListBuilder('ul','two-columns');

    if (breasts == null) {
      return X.addClass('#characterOverlay .breasts-panel','hide');
    }

    const nippleWidth = MeasurementHelper.inchesWithFractions(breasts.nippleWidth,true);
    const nippleLength = MeasurementHelper.inchesWithFractions(breasts.nippleLength,true);
    const areolaWidth = MeasurementHelper.inchesWithFractions(breasts.areolaWidth,true);

    list.add(`<li>Size</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(`${breasts.breastSize}`)}</li>`);
    list.add(`<li>Firmness</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(`${breasts.breastFirmness}`)}</li>`);
    list.add(`<li>Shape</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(breasts.breastShape)}</li>`);
    list.add(`<li>Volume</li>`);
    list.add(`<li>${breasts.absoluteBreastVolume} ml</li>`);
    list.add(`<li>Nipple Shape</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(breasts.nippleShape)}</li>`);
    list.add(`<li>Nipple Shade</li>`);
    list.add(`<li>${breasts.nippleShade}</li>`);
    list.add(`<li>Nipple Width</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(nippleWidth)}</li>`);
    list.add(`<li>Nipple Length</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(nippleLength)}</li>`);
    list.add(`<li>Areola Width</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(areolaWidth)}</li>`);

    X.fill('#characterOverlay .breasts-area',X.createElement(list.getList()))
  }

  // Like the breasts component, I'll wait until I've built the cock describer
  // before spending a lot of time making this look better.
  function fillCock(id) {
    const cock = CockComponent.lookupNormalOf(id);
    const list = ListBuilder('ul','two-columns');

    if (cock == null) {
      return X.addClass('#characterOverlay .cock-panel','hide');
    }

    const cockLength = MeasurementHelper.inchesWithFractions(cock.length,true);
    const cockWidth = MeasurementHelper.inchesWithFractions(cock.width,true);

    list.add(`<li>Shape</li>`);
    list.add(`<li>${cock.shape}</li>`);
    list.add(`<li>Size</li>`);
    list.add(`<li>${cock.size}</li>`);
    list.add(`<li>Length</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(cockLength)}</li>`);

    if (cock.flaccidLength) {
      const flaccidLength = MeasurementHelper.inchesWithFractions(cock.flaccidLength,true);
      list.add(`<li>Flaccid</li>`);
      list.add(`<li>${StringHelper.titlecaseAll(flaccidLength)}</li>`);
    }

    list.add(`<li>Width</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(cockWidth)}</li>`);

    if (cock.knotRatio) {
      let resting = cock.width * (cock.knotRatio/100);
      let inflated = cock.width * (cock.knotRatio/100) * (cock.knotFlare/100);

      resting = MeasurementHelper.inchesWithFractions(resting,true);
      inflated = MeasurementHelper.inchesWithFractions(inflated,true);

      list.add(`<li>Resting Knot Width</li>`);
      list.add(`<li>${StringHelper.titlecaseAll(resting)}</li>`);
      list.add(`<li>Inflated Knot Width</li>`);
      list.add(`<li>${StringHelper.titlecaseAll(inflated)}</li>`);
    }
    if (cock.headFlare) {
      const flare = MeasurementHelper.inchesWithFractions(cock.width * (cock.headFlare/100),true);
      list.add(`<li>Head Flare</li>`);
      list.add(`<li>${StringHelper.titlecaseAll(flare)}</li>`);
    }

    X.fill('#characterOverlay .cock-area',X.createElement(list.getList()))
  }

  function fillPussy(id) {
    const pussy = PussyComponent.lookupNormalOf(id);
    const list = ListBuilder('ul','two-columns');

    if (pussy == null) {
      return X.addClass('#characterOverlay .pussy-panel','hide');
    }

    const pussyWidth = MeasurementHelper.inchesWithFractions(pussy.maxPussyWidth, true)
    const pussyDepth = MeasurementHelper.inchesWithFractions(pussy.maxPussyWidth, true)

    list.add(`<li>Shape</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(pussy.shape)}</li>`);
    list.add(`<li>Width</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(pussyWidth)}</li>`);
    list.add(`<li>Depth</li>`);
    list.add(`<li>${StringHelper.titlecaseAll(pussyDepth)}</li>`);

    if (pussy.clitLength) {
      list.add(`<li>Clit Length</li>`);
      list.add(`<li>${pussy.clitLength}</li>`);
      list.add(`<li>Clit Width</li>`);
      list.add(`<li>${pussy.clitWidth}</li>`);
    }
    if (pussy.innerLabiaLength) {
      list.add(`<li>Inner Labia</li>`);
      list.add(`<li>${pussy.innerLabiaLength}</li>`);
    }
    if (pussy.outerLabiaSize) {
      list.add(`<li>Outer Labia</li>`);
      list.add(`<li>${pussy.outerLabiaSize}</li>`);
    }

    X.fill('#characterOverlay .pussy-area',X.createElement(list.getList()))
  }

  return Object.freeze({
    fillAnus,
    fillBody,
    fillBreasts,
    fillCock,
    fillPussy,
  });

})();
