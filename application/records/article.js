global.Article = (function() {
  const $articles = {};

  function register(code,data) {
    $articles[code] = data;
  }

  function lookup(code) {
    if ($articles[code] == null) { throw new Error(`Bad article code [${code}]`); }

    const article = { ...$articles[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return article.name; },
    });
  }

  return Object.freeze({
    register,
    lookup,
  });

})();
