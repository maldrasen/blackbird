global.WeaverPackage = function(id) {
  const options = [];

  function add(text, requires=null) {
    options.push({ text, requires });
  }

  function pick(context) {
    const valid = [];

    options.forEach((option, index) => {

      console.log("Wat?",option)
      console.log(option.requires)

      // When there is no requirement
      if (options.requires == null) {
        console.log("No Requirements")
        valid.push({ index, text:option.text });
      }

      // When the requirement is a single function.
      if (options.requires != null && typeof option.requires === 'function') {

        console.log("Single Function")

        if (option.requires(context)) {
          valid.push({ index, text:option.text });
        }
      }

      // When the requirement is an array of functions.
      if (options.requires != null && typeof option.requires === 'object') {

        console.log("Function Array")

        if (option.requires.every(requirement => requirement(context))) {
          valid.push({ index, text:option.text });
        }
      }

    });

    if (valid.length === 0) {
      throw new Error(`TextPackage(${id}) has no valid options.`);
    }

    const chosen = Random.from(valid);
    return `<span data-package='${id}' data-option='${chosen.index}'>${chosen.text}</span>`;
  }

  return Object.freeze({
    add,
    pick
  });

};
