global.WeaverPackage = function(id) {
  const options = [];   // Whole-message templates added with add().
  const formats = [];   // Multipart format templates added with defineFormat().
  const parts = {};      // key -> array of part templates added with addPart().

  // Format tokens are written {{key}} to distinguish them from the Weaver's own {token} format. They're replaced with
  // a picked part before the assembled text is ever handed to the Weaver.
  const FORMAT_TOKEN = /{{([\w-]+)}}/g;

  // Add a whole-message template string written in the Weaver token format.
  //  - The requirement can be omitted, a single function, or an array of functions that all need to pass.
  //  - Weight defaults to 100. If nothing in the package has weight then all options are equally likely. Rare lines
  //    can be added alongside them with something like weight:10 or frequent lines with weight:200
  function add(text, requires=null, weight=100) {
    options.push({ text, requires, weight });
  }

  // Add a multipart format template. The format is a Weaver token string that also contains one or more {{key}}
  // tokens, each replaced by a part picked from the matching addPart() group. Requirements live on the individual
  // parts, not the format; weight sets how often the format is chosen against the single-message options.
  function defineFormat(format, weight=100) {
    formats.push({ format, weight, keys:formatKeys(format) });
  }

  // Add a part that can fill a {{key}} token within a format. Parts are picked independently per key, so a handful of
  // authored parts recombine into many different assembled messages. requires and weight behave as in add().
  function addPart(key, text, requires=null, weight=100) {
    (parts[key] = parts[key] || []).push({ text, requires, weight });
  }

  function formatKeys(format) {
    return (format.match(FORMAT_TOKEN) || []).map(token => token.slice(2, -2));
  }

  function meetsRequirement(candidate, context) {
    if (candidate.requires == null) { return true; }
    if (Array.isArray(candidate.requires)) { return candidate.requires.every(requirement => requirement(context)); }
    return candidate.requires(context);
  }

  // Single-message options valid for the context, tagged with their original add() index.
  function getValidOptions(context) {
    const valid = [];

    options.forEach((option, index) => {
      if (meetsRequirement(option, context)) {
        valid.push({ index, text:option.text, weight:option.weight });
      }
    });

    return valid;
  }

  // Parts valid for a given key, tagged with their index within the key's group.
  function validParts(key, context) {
    const valid = [];

    (parts[key] || []).forEach((part, index) => {
      if (meetsRequirement(part, context)) {
        valid.push({ index, text:part.text, weight:part.weight });
      }
    });

    return valid;
  }

  // A format is only usable when every {{key}} it references has at least one valid part to fill it.
  function formatIsUsable(format, context) {
    return format.keys.every(key => validParts(key, context).length > 0);
  }

  // The pool the top-level pick chooses from: every valid single-message option and every usable format, each with a
  // stable token for the frequency map and a render function that produces its span.
  function getCandidates(context) {
    const candidates = [];

    getValidOptions(context).forEach(option => {
      candidates.push({ token:`option:${option.index}`, weight:option.weight, render:() => renderOption(option) });
    });

    formats.forEach((format, index) => {
      if (formatIsUsable(format, context)) {
        candidates.push({ token:`format:${index}`, weight:format.weight, render:ctx => renderFormat(index, format, ctx) });
      }
    });

    return candidates;
  }

  function renderOption(option) {
    return `<span data-package='${id}' data-option='${option.index}'>${option.text}</span>`;
  }

  // A format assembles into a single span. Each {{key}} is replaced inline with its chosen part's text, and the
  // chosen part indices are recorded (in {{key}} order) in a data-parts attribute so the raw HTML stays readable.
  function renderFormat(index, format, context) {
    const chosenParts = [];
    const filled = format.format.replace(FORMAT_TOKEN, (match, key) => {
      const chosen = weightedPick(validParts(key, context).map(part => ({ ...part, token:part.index })));
      chosenParts.push(chosen.index);
      return chosen.text;
    });
    return `<span data-package='${id}' data-format='${index}' data-parts='${chosenParts.join(',')}'>${filled}</span>`;
  }

  // Weighted choice over candidates that each carry a stable .token (used as the frequency-map key) and a .weight.
  function weightedPick(candidates) {
    const frequencyMap = {};
    candidates.forEach(candidate => { frequencyMap[candidate.token] = candidate.weight; });
    const chosen = Random.fromFrequencyMap(frequencyMap);
    return candidates.find(candidate => String(candidate.token) === chosen);
  }

  function pick(context={}) {
    const candidates = getCandidates(context);

    if (candidates.length === 0) {
      throw new Error(`WeaverPackage(${id}) has no valid options.`);
    }

    return weightedPick(candidates).render(context);
  }

  return Object.freeze({
    add,
    defineFormat,
    addPart,
    getValidOptions,
    pick
  });
};
