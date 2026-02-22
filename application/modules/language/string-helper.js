global.StringHelper = (function() {

  // Format number with 2 decimal places.
  function formatNumber(number) {
    return `${Math.round(number*100) / 100}`
  }

  // Turns "   a   b   c " into "a b c"
  function pack(string) {
    return string.replace(/\s+/g,' ').trim();
  }

  // Destroyer of Internets
  function pad(string,length) {
    return (string.length < length) ? `${string}${new Array(length - string.length).fill(' ').join('')}` : string;
  }

  // Converts only the first letter of a string to upper case (for capitalizing sentences mostly)
  function titlecase(word) {
    return `${word.charAt(0).toUpperCase()}${word.substring(1)}`;
  }

  // Converts strings like "title case" or "titleCase" to "Title Case"
  function titlecaseAll(phrase) {
    return phrase.split(/\s+/).
      flatMap(word => word.split(/(?<=[a-z])(?=[A-Z])/)).
      map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).
      join(' ');
  }

  return Object.freeze({
    formatNumber,
    pack,
    pad,
    titlecase,
    titlecaseAll,
  });

})();
