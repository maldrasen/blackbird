global.EnglishHelper = (function() {

  // This obviously doesn't include all the irregular plurals, and I could find a better way to handle capitalized
  // irregular words, but this is probably good enough for now.
  function pluralize(word) {
    if (word === 'Foot') { return 'Feet'; }
    if (word === 'Man') { return 'Men'; }
    if (word === 'Woman') { return 'Women'; }
    if (word === 'Vermen') { return 'Vermen'; }

    if (word === 'foot') { return 'feet'; }
    if (word === 'man') { return 'men'; }
    if (word === 'woman') { return 'women'; }

    if (word.endsWith('s')) { return `${word}es` }
    if (word.endsWith('sh')) { return `${word}es` }
    if (word.endsWith('ch')) { return `${word}es` }
    if (word.endsWith('x')) { return `${word}es` }
    if (word.endsWith('z')) { return `${word}es` }
    if (word.endsWith('f')) { return `${word.substring(0,word.length-1)}ves`; }
    if (word.endsWith('fe')) { return `${word.substring(0,word.length-2)}ves`; }

    if (word.endsWith('y')) {
      const stem = word.substring(0,word.length-1)
      const proceeding = word.substring(word.length-2, word.length-1);
      return isVowel(proceeding) ? `${word}s` : `${stem}ies`
    }
    if (word.endsWith('o')) {
      const proceeding = word.substring(word.length-2, word.length-1);
      return isVowel(proceeding) ? `${word}s` : `${word}es`;
    }

    return `${word}s`;
  }

  function isVowel(letter) {
    if (typeof letter === 'string' && letter.length === 1) {
      return ['a','e','i','o','u'].includes(letter);
    }
    throw new Error(`${letter} is not a letter`);
  }

  // Simple possessive logic that works for most words. (Add exceptions to this when we find them.)
  function possessive(word) {
    return word.endsWith('s') ? `${word}'` : `${word}'s`;
  }

  // Prepends 'a' or 'an' to the beginning of the string.
  function a_an(string) {
    return string.match(/^[aeiou]/i) ? `an ${string}` : `a ${string}`;
  }

  // Prepends 'A' or 'An' to the beginning of the string.
  function A_An(string) {
    return string.match(/^[aeiou]/i) ? `An ${string}` : `A ${string}`;
  }

  // Returns a positive number in English. If a 'whenOne' option is specified then that is returned for 'one' in cases
  // where "a" or "an" would sound better in a phrase, i.e. 'a big black cock' is better than 'one big black cock'. The
  // whenZero options is the same, but for zero.
  function numberInEnglish(number, options={}) {
    const oneWords = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tenWords = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const teenWords = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    let millions = function(n) {
      return (n >= 1000000) ?
        `${millions(Math.floor(n/1000000))} million ${thousands(n%1000000)}`:
        `${thousands(n)}`;
    }

    let thousands = function(n) {
      return (n >= 1000) ?
        `${hundreds(Math.floor(n/1000))} thousand ${hundreds(n%1000)}`:
        `${hundreds(n)}`
    }

    let hundreds = function(n) {
      return (n >= 100) ?
        `${oneWords[Math.floor(n/100)]} hundred ${tens(n%100)}`:
        `${tens(n)}`
    }

    let tens = function(n) {
      if (n < 10) { return oneWords[n]; }
      if (n >= 10 && n < 20) { return teenWords[n-10]; }
      if (n % 10 === 0) { return tenWords[Math.floor(n/10)]; }
      return `${tenWords[Math.floor(n/10)]}-${oneWords[n%10]}`;
    }

    if (number < 0)  { throw new Error(`Not doing negative numbers in English: ${number}`); }
    if (number === 0) { return options.whenZero || 'zero'; }
    if (number === 1) { return options.whenOne || 'one'; }

    return millions(number).trim();
  }

  // Same as numberInEnglish(), but upper case.
  function NumberInEnglish(number, options) {
    return StringHelper.titlecase(EnglishHelper.numberInEnglish(number, options));
  }

  return Object.freeze({
    pluralize,
    possessive,
    a_an,
    A_An,
    numberInEnglish,
    NumberInEnglish,
  });

})();
