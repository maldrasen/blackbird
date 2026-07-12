global.WeaverPackage = function(id) {
  const TOKEN = /{{([\w-]+)}}/g;

  const formats = [];
  const wholes = [];
  const parts = {};

  // A WeaverPackage can define a format as a kind of super template. The package format uses `{{key}}` to define a
  // part. Parts are added with the addPart() function. Like a normal full text option, each part can have a weight and
  // its own requirements. When the pick() function runs it chooses a format that currently has valid options, based on
  // that format's weight. The package tokens are replaced with template parts to create a template that can then be
  // sent to the weaver.

  function defineFormat(format, weight=100) {
    formats.push({ format, weight,
      keys: (format.match(TOKEN) || []).map(token => token.slice(2, -2)),
    });
  }

  function add(text, requires=null, weight=100) {
    wholes.push({ text, requires, weight });
  }

  function addPart(key, text, requires=null, weight=100) {
    if (parts[key] == null) { parts[key] = []; }
    parts[key].push({ text, requires, weight });
  }

  function pick(context={}) {
    const weights = {};

    if (validFrom(wholes,context).length > 0) {
      weights['whole'] = 100;
    }

    formats.forEach((format, index) => {
      if (formatHasOptions(format, context)) {
        weights[index] = format.weight;
      }
    });

    const key = Random.fromFrequencyMap(weights)

    return (key === 'whole') ? renderWhole(context) : renderFormat(key, context);
  }

  function renderWhole(context) {
    const option = pickWeightedOption(validFrom(wholes, context));
    return `<span data-package='${id}' data-option='${option.index}'>${option.text}</span>`;
  }

  function renderFormat(formatIndex, context) {
    const format = formats[formatIndex];
    const chosenParts = [];

    const template = format.format.replace(TOKEN, (match, key) => {
      const part = pickWeightedOption(validFrom(parts[key], context));
      chosenParts.push(part.index);
      return part.text;
    });

    return `<span data-package='${id}' data-format='${formatIndex}' data-parts='${chosenParts.join(',')}'>${template}</span>`;
  }

  function pickWeightedOption(options) {
    return options[Random.fromFrequencyMap(Object.fromEntries(options.map((option, index) => [index, option.weight])))];
  }

  function formatHasOptions(format, context) {
    return format.keys.every(key => validFrom(parts[key], context).length > 0);
  }

  function validFrom(parts, context) {
    return parts.flatMap((option, index) =>
      meetsRequirement(option, context) ? [{ index, text: option.text, weight: option.weight }] : []);
  }

  function meetsRequirement(part, context) {
    if (part.requires == null) { return true; }
    if (Array.isArray(part.requires)) { return part.requires.every(requirement => requirement(context)); }
    return part.requires(context);
  }

  return Object.freeze({
    defineFormat,
    add,
    addPart,
    pick,
  });
};
