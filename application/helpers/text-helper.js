global.TextHelper = (function() {

  function titlecase(word) {
    return `${word.charAt(0).toUpperCase()}${word.substring(1)}`;
  }

  function titlecaseAll(phrase) {
    return phrase.split(/\s/).map(word => { return titlecase(word) }).join(' ');
  }

  // Format number with 2 decimal places.
  function formatNumber(number) {
    return `${Math.round(number*100) / 100}`
  }

  return Object.freeze({
    titlecase,
    titlecaseAll,
    formatNumber,
  })

})();
