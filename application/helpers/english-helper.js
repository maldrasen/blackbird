global.EnglishHelper = {

  possessive(word) {
    return word.endsWith('s') ? `${word}'` : `${word}'s`;
  },

  // Prepends 'a' or 'an' to the beginning of the string.
  a_an(string) {
    return string.match(/^[aeiou]/i) ? `an ${string}` : `a ${string}`;
  },

  // Prepends 'A' or 'An' to the beginning of the string.
  A_An(string) {
    return string.match(/^[aeiou]/i) ? `An ${string}` : `A ${string}`;
  },

  // Returns a positive number in English. If a 'whenOne' option is specified
  // then that is returned for 'one' in cases where "a" or "an" would sound
  // better in a phrase, i.e. 'a big black cock' is better than 'one big black
  // cock'. The whenZero options is the same, but for zero.
  numberInEnglish(number, options={}) {
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

    if (number < 0)  { throw `Error: Not doing negative numbers in English: ${number}`; }
    if (number === 0) { return options.whenZero || 'zero'; }
    if (number === 1) { return options.whenOne || 'one'; }

    return millions(number);
  },

  // Same as numberInEnglish(), but upper case.
  NumberInEnglish(number, options) {
    return TextHelper.titlecase(EnglishHelper.numberInEnglish(number, options));
  },

};
