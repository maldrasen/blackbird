global.PussyLoom = (function() {

  const pussyWords = { pussy:10, cunt:8, snatch:1, quim:1 }

  // This is all still a work in progress, but we can use this for a bit to see how it works out. I already know I'm
  // going to need to be more descriptive with dog and horse cunts. Not sure to what extent we should take other
  // factors into consideration, things like labia length and thickness, clit size, etc. Eventually I think there will
  // be a 'sex fluids' system so we can describe a pussy as being cum filled. Other conditions like gaping or prolapsed
  // will also need to be looked at.

  // {A:pussy.tightWetPussy} A phrase like "tight dripping cunt" or "snug wet pussy"
  // {A:pussy.tightPussy} A phrase like "tight pussy" or "loose cunt"
  // {A:pussy.wetPussy} A phrase like "wet pussy" or "dripping cunt"
  // {A:pussy.tight} Just an adjective describing how tight the pussy is.
  // {A:pussy.wet} Just an adjective describing how wet the pussy is.
  // {A:pussy.pussy} A single word for "pussy" that takes the pussy shape into consideration.
  function weave(id, token) {
    const pussy = PussyComponent.lookupNormalOf(id);

    if (token === 'tightWetPussy') { return `${tightWord(pussy)} ${wetWord(id)} ${pussyWord(pussy)}`; }
    if (token === 'tightPussy') { return `${tightWord(pussy)} ${pussyWord(pussy)}`; }
    if (token === 'wetPussy') { return `${wetWord(id)} ${pussyWord(pussy)}`; }
    if (token === 'tight') { return tightWord(pussy); }
    if (token === 'wet') { return wetWord(id); }
    if (token === 'pussy') { return pussyWord(pussy); }

    return Weaver.formatWarning(`[Pussy:${token}]`);
  }

  function pussyWord(pussy) {
    const options = { pussy:12, cunt:8, snatch:1, quim:1 };

    if (pussy.shape === 'dragon') {
      options['slit'] = 6;
    }

    return Random.fromFrequencyMap(options);
  }

  function tightWord(pussy) {
    if (pussy.maxPussyWidth < 58) { return Random.fromFrequencyMap({ tight:10, snug:6 }); }
    if (pussy.maxPussyWidth < 82) { return Random.fromFrequencyMap({ velvety:10, yielding:6, plush:3 }); }
    return Random.fromFrequencyMap({ loose:10, stretched:6 });
  }

  function wetWord(id) {
    const arousal = ArousalComponent.lookup(id).arousal;
    if (arousal < 25) { return Random.fromFrequencyMap({ warm:10, soft:4 }); }
    if (arousal < 75) { return Random.fromFrequencyMap({ wet:10, slick:8, glistening:3 }); }
    return Random.fromFrequencyMap({ dripping:10, soaked:6, drenched:4 });
  }

  return Object.freeze({
    pussyWords,
    weave
  });

})();
