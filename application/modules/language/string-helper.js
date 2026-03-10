global.StringHelper = (function() {

  // Format number with 2 decimal places.
  function formatNumber(number) {
    return `${Math.round(number*100) / 100}`
  }

  // Turns "   a   b   c " into "a b c"
  function pack(string) {
    return string.replace(/\s+/g,' ').trim();
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

  // Common algorithm used to find the length of the longest matching substring between two strings. We use this in
  // character creation to reject names like "Dancer Moondancer" where the name and the surname are too similar.
  // Written by AI, but tested.
  function longestCommonSubstring(a,b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    let longest = 0;
    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          if (dp[i][j] > longest) longest = dp[i][j];
        }
      }
    }

    return longest;
  }

  return Object.freeze({
    formatNumber,
    pack,
    titlecase,
    titlecaseAll,
    longestCommonSubstring,
  });

})();
