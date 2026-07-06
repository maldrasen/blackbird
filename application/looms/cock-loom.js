global.CockLoom = (function() {

  const cockWords = {
    cock: 20,
    dick: 8,
    shaft: 4,
    length: 2,
    member: 2,
  };

  const sizeWords = {
    tiny:    { tiny:10, little:8 },
    small:   { small:10, modest:6, little:3 },
    average: { hefty:10, solid:6, sizable:4 },
    big:     { big:10, large:8, heavy:6 },
    huge:    { huge:10, massive:8, heavy:4 },
    monster: { monster:10, massive:8, enormous:6 },
    giant:   { gigantic:10, enormous:8, monstrous:4 },
    titanic: { titanic:10, colossal:8, gargantuan:4 },
  };

  const hardWords = {
    hard: 5,
    throbbing: 2,
  }

  // {A:cock.thickSixInchLongCock} A long phrase that explicitly includes the length.
  // {A:cock.sixInch} A short phrase with just the length.
  // {A:cock.bigCock} A phrase like "huge cock" or "big dick"
  // {A:cock.big} Just an adjective that can be used to describe the cock.
  // {A:cock.thickCock} A phrase that doesn't rely on size.
  // {A:cock.thick} An adjective that doesn't rely on size.
  function weave(id, token) {
    const cock = CockComponent.lookupNormalOf(id);

    if (token === 'thickSixInchLongCock') { return `${adjective(cock)} ${inchPhrase(id,cock)} long ${cockWord(cock)}`; }
    if (token === 'sixInch') { return inchPhrase(id,cock); }
    if (token === 'bigCock') { return `${sizeWord(cock.size)} ${cockWord()}`; }
    if (token === 'bigHardCock') { return `${sizeWord(cock.size)} ${hardWord()} ${cockWord()}`; }
    if (token === 'big') { return sizeWord(cock.size); }
    if (token === 'thickCock') { return `${adjective(cock)} ${cockWord()}`; }
    if (token === 'thick') { return adjective(cock); }

    return Weaver.formatWarning(`[Cock:${token}]`);
  }

  function cockWord() { return Random.fromFrequencyMap(cockWords); }
  function sizeWord(size) { return Random.fromFrequencyMap(sizeWords[size]); }
  function hardWord() { return Random.fromFrequencyMap(hardWords); }

  // TODO: The 'thick' tokens don't necessarily imply girth. Any adjective that describes this cock would work. We
  //       should look at the arousal state for other words like hard, or throbbing. If this is a horse or dog cock we
  //       add bestial or knotted. We could look at the body skin color for big black, or if it's a lupin assume deep
  //       red. (Do equins need a cock color attribute or is it safe to use skin color?)

  function adjective(cock) {
    if (cock.width < 25) { return Random.fromFrequencyMap({ slender:10, slim:8, narrow:4 }); }
    if (cock.width < 38) { return Random.fromFrequencyMap({ firm:10, solid:8, heavy:3 }); }
    if (cock.width < 50) { return Random.fromFrequencyMap({ thick:10, meaty:6, veiny:3 }); }
    return Random.fromFrequencyMap({ thick:10, fat:8, girthy:4 });
  }

  // When we're describing the length of a cock we should always use the erect length. A phrase like "massive four
  // inch long cock" is technically correct for a flaccid cock that grows to over a foot long, but it's confusing.
  // When we're in block of text where a flaccid cock is being described just use the 'thickCock' token instead.
  // This function also drops the fractional inches for absurdly large cocks; anything bigger than two feet long.
  function inchPhrase(id, cock) {
    return (cock.length > 600) ?
      MeasurementHelper.feetAndInchesInEnglish(cock.length, true, true):
      MeasurementHelper.inchesWithFractions(cock.length, false, true);
  }

  return Object.freeze({
    cockWords,
    weave
  });

})();
