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
    list.add(`<li>Eyes</li>`);
    list.add(`<li class='fg-eye-color-${body.eyeColor}'>${eyes}</li>`)

    if (body.skinType === 'scales') {
      list.add(`<li>Scale Color</li>`);
      list.add(`<li class='fg-scale-color-${body.scaleColor}'>${StringHelper.titlecaseAll(body.scaleColor)}</li>`);
    }
    if (body.skinType !== 'scales') {
      list.add(`<li>Skin Color</li>`);
      list.add(`<li class='fg-skin-color-${body.skinColor}'>${StringHelper.titlecaseAll(body.skinColor)}</li>`);
      list.add(`<li>Hair Color</li>`);
      list.add(`<li class='fg-hair-color-${body.hairColor}'>${StringHelper.titlecaseAll(body.hairColor)}</li>`);
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

  function fillCock(id) {
    const cock = CockComponent.lookupNormalOf(id);
    if (cock == null) {
      return X.addClass('#characterOverlay .cock-panel','hide');
    }
  }

  function fillPussy(id) {
    const pussy = PussyComponent.lookupNormalOf(id);
    if (pussy == null) {
      return X.addClass('#characterOverlay .pussy-panel','hide');
    }
  }

  return Object.freeze({
    fillAnus,
    fillBody,
    fillBreasts,
    fillCock,
    fillPussy,
  });

})();
