global.Dialog = (function() {

  const dialog = {};

  Object.values(ArchetypeCode).forEach(archetype => {
    dialog[archetype] = {};
  });

  function register(archetype, code, template) {
    dialog[archetype][code] = template
  }

  // TODO: We could include a fallback option to get a generic version of the
  //   dialog if it's not found in the archetype. We could also define some
  //   archetypes as being based on another. For instance an anal-slut would
  //   have more anal related dialog but fall back on slut for most dialog.
  //   Same could be done with a big-titted bimbo or a big-cock himbo.
  function lookupTemplate(archetype, code, context) {
    const generator = dialog[archetype][code];

    if (typeof generator === 'function') {
      return generator(context)
    }

    return `<span class='dialog-error'>[Missing Dialog Template ${archetype}:${code}]</span>`
  }

  return Object.freeze({
    register,
    lookupTemplate,
  });

})();