global.CharacterBodyPanel = (function() {

  function fillAnus(id) {}

  function fillBody(id) {
    const body = BodyComponent.lookup(id);
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

    X.fill('#characterOverlay .body-area',X.createElement(list.getList()))
  }

  function fillBreasts(id) {}
  function fillCock(id) {}
  function fillMouth(id) {}
  function fillPussy(id) {}

  return Object.freeze({
    fillAnus,
    fillBody,
    fillBreasts,
    fillCock,
    fillMouth,
    fillPussy,
  });

})();
