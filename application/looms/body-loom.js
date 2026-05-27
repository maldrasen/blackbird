global.BodyLoom = (function() {

  function weave(id, token) {
    const body = BodyComponent.lookup(id);

    if (token === 'eyeColor') {  return body.eyeColor; }

    return Weaver.formatWarning(`[Body:${token}]`);
  }

  return Object.freeze({ weave });

})();
