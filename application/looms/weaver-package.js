global.WeaverPackage = function(id) {
  const options = [];

  function add(text, requires=null) {
    options.push({ text, requires });
  }

  // The requirement can be omitted, a single function, or an array of functions that all need to pass.
  function meetsRequirement(option, context) {
    if (option.requires == null) { return true; }
    if (Array.isArray(option.requires)) { return option.requires.every(requirement => requirement(context)); }
    return option.requires(context);
  }

  function pick(context) {
    const valid = [];

    options.forEach((option, index) => {
      if (meetsRequirement(option, context)) {
        valid.push({ index, text:option.text });
      }
    });

    if (valid.length === 0) {
      throw new Error(`WeaverPackage(${id}) has no valid options.`);
    }

    const chosen = Random.from(valid);
    return `<span data-package='${id}' data-option='${chosen.index}'>${chosen.text}</span>`;
  }

  return Object.freeze({
    add,
    pick
  });

};
