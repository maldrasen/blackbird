global.TextSource = (function() {
  const $textSources = {};

  function register(code,data) {
    $textSources[code] = data;
  }

  function getAllCodes() {
    return Object.keys($textSources);
  }

  function lookup(code) {
    if ($textSources[code] == null) { throw new Error(`Bad text source code [${code}]`); }

    const source = { ...$textSources[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getText: () => { return Random.from(source.text); }
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
