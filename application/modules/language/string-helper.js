global.StringHelper = (function() {

  // Format number with 2 decimal places.
  function formatNumber(number) {
    return `${Math.round(number*100) / 100}`
  }

  // Turns "   a   b   c " into "a b c"
  function pack(string) {
    return string.replace(/\s+/g,' ').trim();
  }

  function pad(string,length) {
    return (string.length < length) ? `${string}${new Array(length - string.length).fill(' ').join('')}` : string;
  }

  function titlecase(word) {
    return `${word.charAt(0).toUpperCase()}${word.substring(1)}`;
  }

  function titlecaseAll(phrase) {
    return phrase.split(/\s/).map(word => { return titlecase(word) }).join(' ');
  }

  return Object.freeze({
    formatNumber,
    pack,
    pad,
    titlecase,
    titlecaseAll,
  });

})();
