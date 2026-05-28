global.BodyLoom = (function() {

  function weave(id, token) {
    const body = BodyComponent.lookup(id);

    if (token === 'eyeColor') {  return body.eyeColor; }
    if (token === 'furColor') {  return translateHairColor(body.furColor); }
    if (token === 'hairColor') {  return translateHairColor(body.hairColor); }

    return Weaver.formatWarning(`[Body:${token}]`);
  }

  // The eye colors are all single words, but the hair (and fur) colors have compound words like darkRed. Rather than
  // mapping all of these using the string helper to translate "darkRed" first into "Dark Red" then to "dark red"
  // works for all the current hair colors.
  function translateHairColor(code) {
    return StringHelper.titlecaseAll(code).toLowerCase();
  }

  return Object.freeze({ weave });

})();
