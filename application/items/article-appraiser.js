global.ArticleAppraiser = (function() {

  // Articles are read only data objects, but the article values are calculated rather than set directly. The
  // appraiser runs at lead time to set the value of all the articles so that an article's getValue function can just
  // return a precalculated value. Once a value has been set by this loader it can't be overwritten.
  function run() {
    Article.getAllCodes().forEach(code => {
      Article.setValue(code, appraise(code));
    });
  }

  function appraise(code) {
    const article = Article.lookup(code);
    let value = article.getBaseValue() || 0;
    return value;
  }

  return { run }

})();