global.MeasurementHelper = (function() {

  // UTF-8 symbols for measurements like 4′11″. Explicit constants so that they're not confused with regular quotes.
  const prime = '′'
  const doublePrime = '″'

  function feetAndInches(mm) {
    const inches = Math.round(mm / 25.4);
    return {
      feet: Math.floor(inches / 12),
      inches: inches % 12,
    }
  }

  // The feetInchesAndFraction() function takes a length in mm, and returns whole feet, whole inches, and the
  // fractional remainder to the fourth or eighth inch, represented by an index between 0-3 or 0-7.
  function feetInchesAndFraction(mm, eighths=false) {
    const totalInches = mm / 25.4;
    const wholeInches = Math.floor(totalInches);
    const fraction = totalInches - wholeInches;
    const divisions = eighths ? 8 : 4;
    const index = Math.round(fraction * divisions);

    // The fraction rounded up to the next whole inch.
    if (index === divisions) {
      const nextInch = wholeInches + 1;
      return {
        feet: Math.floor(nextInch / 12),
        inches: nextInch % 12,
        index: 0,
      }
    }

    return {
      feet: Math.floor(wholeInches / 12),
      inches: wholeInches % 12,
      index: index,
    }
  }

  function feetAndInchesAbbreviated(mm) {
    const length = feetAndInches(mm);
    return `${length.feet}${prime}${length.inches}${doublePrime}`;
  }

  function feetAndInchesInEnglish(mm, singular=false) {
    const length = feetAndInches(mm);
    const feet = singular ? 'foot' : 'feet';
    const phrase = `${EnglishHelper.numberInEnglish(length.feet)} ${feet}`;

    if (length.inches === 1) {
      return `${phrase}, one inch`
    }

    if (length.inches > 1) {
      return `${phrase}, ${EnglishHelper.numberInEnglish(length.inches)} inches`;
    }

    return phrase;
  }

  function feetAndInchesWithFractions(mm, eighths=false, singular=false) {
    const length = feetInchesAndFraction(mm, eighths);
    const feetWord = (singular || length.feet === 1) ? 'foot' : 'feet';
    const inchesWord = length.inches === 1 ? 'inch' : 'inches';

    if (length.feet === 0 && length.inches === 0) {
      return tinyFractionPhrase(length.index, eighths, mm);
    }

    if (length.feet > 0 && length.inches === 0 && length.index === 0) {
      return `${EnglishHelper.numberInEnglish(length.feet)} ${feetWord}`;
    }

    const inchPhrase = `${EnglishHelper.numberInEnglish(length.inches)} ${fractionPhrase(length.index, eighths)} ${inchesWord}`
    const feetPhrase = length.feet > 0 ? `${EnglishHelper.numberInEnglish(length.feet)} ${feetWord},` : '';

    return StringHelper.pack(`${feetPhrase} ${inchPhrase}`);
  }

  function inchesWithFractions(mm, eighths=false) {
    const length = feetInchesAndFraction(mm, eighths);
    const inches = (length.feet * 12) + length.inches;
    const inchesWord = length.inches === 1 ? 'inch' : 'inches';

    if (inches === 0) {
      return tinyFractionPhrase(length.index, eighths, mm);
    }

    return StringHelper.pack(`${EnglishHelper.numberInEnglish(inches)} ${fractionPhrase(length.index, eighths)} ${inchesWord}`);
  }

  function footAndInchesWithFractions(mm, eighths=false) {
    return feetAndInchesWithFractions(mm,eighths,true);
  }

  function footAndInchesInEnglish(mm) {
    return feetAndInchesInEnglish(mm,true);
  }

  function fractionPhrase(index, eighths) {
    if (eighths) {
      switch(index) {
        case 0: return '';
        case 1: return 'and one-eighth';
        case 2: return 'and a quarter';
        case 3: return 'and three-eighths';
        case 4: return 'and a half';
        case 5: return 'and five-eighths';
        case 6: return 'and three-quarters';
        case 7: return 'and seven-eighths';
      }
    } else {
      switch(index) {
        case 0: return '';
        case 1: return 'and a quarter';
        case 2: return 'and a half';
        case 3: return 'and three-quarters';
      }
    }
  }

  function tinyFractionPhrase(index, eighths, mm) {
    if (eighths) {
      switch(index) {
        case 0: return (mm === 1) ? `${mm} millimeter` : `${mm} millimeters`; // Fallback to mm when less than an eighth.
        case 1: return 'eighth inch';
        case 2: return 'quarter inch';
        case 3: return 'three-eighths inch';
        case 4: return 'half inch';
        case 5: return 'five-eighths inch';
        case 6: return 'three-quarters inch';
        case 7: return 'seven-eighths inch';
      }
    }
    switch(index) {
      case 0: return (mm === 1) ? `${mm} millimeter` : `${mm} millimeters`; // Fallback to mm when less than an eighth.
      case 1: return 'quarter inch';
      case 2: return 'half inch';
      case 3: return 'three-quarter inch';
    }
  }

  return Object.freeze({
    feetAndInches,
    feetInchesAndFraction,
    feetAndInchesAbbreviated,
    feetAndInchesInEnglish,
    footAndInchesInEnglish,
    feetAndInchesWithFractions,
    footAndInchesWithFractions,
    inchesWithFractions,
  });

})();
