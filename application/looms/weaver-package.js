global.WeaverPackage = function(id) {
  const options = [];

  // Add a template string written in the Weaver token format to the WeaverPackage
  //  - The requirement can be omitted, a single function, or an array of functions that all need to pass.
  //  - Weight defaults to 100. If nothing in the package has weight then all options are equally likely. Rare lines
  //    can be added alongside them with something like weight:10 or frequent lines with weight:200
  function add(text, requires=null, weight=100) {
    options.push({ text, requires, weight });
  }

  function meetsRequirement(option, context) {
    if (option.requires == null) { return true; }
    if (Array.isArray(option.requires)) { return option.requires.every(requirement => requirement(context)); }
    return option.requires(context);
  }

  function pick(context={}) {
    const valid = [];

    options.forEach((option, index) => {
      if (meetsRequirement(option, context)) {
        valid.push({ index, text:option.text, weight:option.weight });
      }
    });

    if (valid.length === 0) {
      throw new Error(`WeaverPackage(${id}) has no valid options.`);
    }

    const frequencyMap = {};
    valid.forEach(option => { frequencyMap[option.index] = option.weight; });

    const chosenIndex = Number(Random.fromFrequencyMap(frequencyMap));
    const chosen = valid.find(option => option.index === chosenIndex);
    return `<span data-package='${id}' data-option='${chosen.index}'>${chosen.text}</span>`;
  }

  return Object.freeze({
    add,
    pick
  });
};
