global.BreastsLoom = (function() {

  const breastsWord = { tits:10, breasts:8 };
  const breastWord = { tit:10, breast:8 };

  const sizeWords = {
    zero:    { flat:10 },
    tiny:    { tiny:10, little:6 },
    small:   { small:10, modest:6 },
    average: { plump:10, swollen:8 },
    big:     { big:10, large:8, heavy:8 },
    huge:    { huge:10, overflowing:8 },
    monster: { monster:10, massive:10, enormous:8, titanic:7 },
  };

  const firmnessWords = {
    soft:   { soft:10, pillowy:8, jiggly:5, squishy:4, doughy:2 },
    medium: { plush:10, yielding:6, supple:8 },
    firm:   { firm:10, solid:6, stiff:2 },
  };

  const comparisonConnectors = { 'the size of':10, 'as big as':6, 'as large as':4 };

  const shapeWords = {
    'flat':             { 'flat':10, 'barely noticeable':5 },
    'pancakes':         { 'flat':10 },
    'tiny-balls':       { 'jutting':10, 'pointed':8, 'adorable':3 },
    'tiddys':           { 'cute':10,  'adorable':3, 'compact':1 },
    'pert':             { 'pert':10, 'perky':10, 'upturned':2 },
    'small-balls':      { 'round':10 },
    'teardrops':        { 'teardrop':10 },
    'conical':          { 'conical':10 },
    'balls':            { 'round':10 },
    'tubular':          { 'tubular':10, 'long':8 },
    'swingers':         { 'swinging':10, 'dangling':10 },
    'average':          { 'full':10, 'beautiful':8, 'perfectly shaped':8 },
    'perky':            { 'perky':10, 'upthrust':6 },
    'torpedoes':        { 'elongated':10, 'projecting':4 },
    'dangling':         { 'dangling':10, 'heavy':8 },
    'heavy-bells':      { 'bell shaped':10, 'heavy':8, 'bell like':5 },
    'big-round':        { 'round':10 },
    'pendulous':        { 'pendulous':10, 'heavy':8, 'low hanging':5 },
    'hangers':          { 'hanging':10, 'dangling':9, 'swinging':8, 'sagging':6 },
    'cow-tits':         { 'cow like':10, 'heavily veined':8 },
    'bimbo':            { 'bimbo':10, 'spherical':8, 'perfectly rounded':7, 'fake looking':2 },
    'elongated-sacks':  { 'elongated':10, 'dangling':8, 'heavy stretched':3 },
    'massive-bells':    { 'low hanging':10, 'swinging':8, 'heavy pendulous':8 },
    'straining-round':  { 'round':10, 'spherical':8, 'perfectly rounded':7 },
  };

  // {A:breasts.bigSoftBreasts} A phrase like "big firm tits" or "large soft breasts"
  // {A:breasts.bigBreasts} A phrase like "big tits" or "large breasts"
  // {A:breasts.softBreasts} A phrase like "soft tits" or "firm breasts"
  // {A:breasts.bigRoundBreasts} A phrase describing breast size and shape.
  // {A:breasts.big} An adjective that can be used to describe the breast size.
  // {A:breasts.soft} An adjective that can be used to describe the breast firmness.
  // {A:breasts.round} An adjective that can be used to describe the breast shape.
  // {A:breasts.breast} A single word for "breast" (note singular) that takes size and shape into consideration.
  // {A:breasts.breasts} A single word for "breasts" (note plural) that takes size and shape into consideration.
  // {A:breasts.bigSoft} A longer adjective phrase without a word for breasts.
  // {A:breasts.bigRound} A longer adjective phrase describing the shape without a word for breasts.
  // {A:breasts.thickNipples} A phrase like 'long nipples' or 'dark teats'
  // {A:breasts.hardThickNipples} Like thickNipples, but stiff with arousal. A phrase like 'long hard nipples'
  // {A:breasts.appleSized} An attributive size comparison like "cantaloupe sized", for use in front of a noun.
  // {A:breasts.appleSizedBreasts} A phrase like "cantaloupe sized tits".
  // {A:breasts.breastsBigAsApples} A phrase like "tits the size of small cantaloupes".
  // {A:breasts.apples} A plural comparison phrase like "small cantaloupes". Only use it after a comparative, as in
  //                    "no larger than {A:breasts.apples}". Never put it in front of "sized"; that's what appleSized
  //                    is for, because the phrase's own adjectives would read as describing the breasts.
  // {A:breasts.anApple} A singular comparison phrase like "a small cantaloupe", with the same restriction.
  function weave(id, token) {
    const breasts = BreastsComponent.lookup(id);
    const size = breasts.breastSize;
    const firmness = breasts.breastFirmness;
    const shape = breasts.breastShape;

    if (token === 'bigSoftBreasts') { return `${sizeWord(size)} ${firmnessWord(firmness)} ${getBreastsWord(breasts)}`; }
    if (token === 'bigBreasts') { return `${sizeWord(size)} ${getBreastsWord(breasts)}`; }
    if (token === 'softBreasts') { return `${firmnessWord(firmness)} ${getBreastsWord(breasts)}`; }
    if (token === 'bigRoundBreasts') { return `${sizeWord(size)} ${shapeWord(shape)} ${getBreastsWord(breasts)}`; }
    if (token === 'bigSoft') { return `${sizeWord(size)} ${firmnessWord(firmness)}`; }
    if (token === 'bigRound') { return `${sizeWord(size)} ${shapeWord(shape)}`; }

    if (token === 'big') { return sizeWord(size); }
    if (token === 'soft') { return firmnessWord(firmness); }
    if (token === 'round') { return shapeWord(shape); }
    if (token === 'breast') { return getBreastWord(breasts); }
    if (token === 'breasts') { return getBreastsWord(breasts); }
    if (token === 'thickNipples') { return shortNippleDescription(breasts); }
    if (token === 'hardThickNipples') { return hardNippleDescription(breasts); }

    if (token === 'appleSized') { return withComparison(breasts, token, appleSized); }
    if (token === 'appleSizedBreasts') { return withComparison(breasts, token, appleSizedBreasts); }
    if (token === 'breastsBigAsApples') { return withComparison(breasts, token, breastsBigAsApples); }
    if (token === 'apples') { return withComparison(breasts, token, apples); }
    if (token === 'anApple') { return withComparison(breasts, token, anApple); }

    return Weaver.formatWarning(`[Breasts:${token}]`);
  }

  // Shapes without a round object to compare against have no ladder, so using a comparison token for one of them is a
  // template problem that gets a warning. A relative volume past the end of its ladder means the breast volume and
  // size category are out of sync, which is an error.
  function withComparison(breasts, token, compose) {
    const ladder = BreastComparisons[breasts.breastShape];
    if (ladder == null) { return Weaver.formatWarning(`[Breasts:${token}:${breasts.breastShape}]`); }

    const volume = breasts.relativeBreastVolume;
    const rung = ladder.find(rung => volume <= rung.max);
    if (rung == null) { throw new Error(`Breast volume ${volume}ml is past the end of the ${breasts.breastShape} ladder.`); }

    return compose(rung, breasts);
  }

  function appleSized(rung) { return `${Random.from(rung.nouns)} sized`; }
  function appleSizedBreasts(rung, breasts) { return `${appleSized(rung)} ${getBreastsWord(breasts)}`; }
  function comparisonPhrase(rung) { return Random.from(rung.phrases); }
  function apples(rung) { return EnglishHelper.pluralize(comparisonPhrase(rung)); }

  function anApple(rung) {
    const phrase = comparisonPhrase(rung);
    return `${EnglishHelper.a_an(phrase)} ${phrase}`;
  }

  function breastsBigAsApples(rung, breasts) {
    return `${getBreastsWord(breasts)} ${Random.fromFrequencyMap(comparisonConnectors)} ${apples(rung)}`;
  }

  // Unlike the {breast} token (which usually resolves to "breast" or "tit") this breast word function takes the
  // breast size and shape and shape into consideration as well. This is needed for words like "udder", which imply a
  // certain size, or "hanger" which imply a large saggy tit. These words are all easily pluralizable so the
  // breastsWord() function can just call this and add an 's' to the output.
  function getBreastWord(breasts) {
    const options = { tit:20, breast:18 };

    if (['zero','tiny','small'].includes(breasts.breastSize)) {
      options['titty'] = 4;
      options['bud'] = 3;
    }

    if (['big','huge','monster'].includes(breasts.breastSize)) {
      options['melon'] = 3;
    }

    if (['huge','monster'].includes(breasts.breastSize)) {
      options['udder'] = 5;
      options['jug'] = 2;
      options['knocker'] = 2;
    }

    if (breasts.breastShape === 'tiddys') { options['tiddy'] = 2; }
    if (breasts.breastShape === 'teardrops') { options['teardrop'] = 2; }

    if (BreastData.SaggyShapes.includes(breasts.breastShape)) {
      options['swinger'] = 3;
      options['hanger'] = 3;
    }

    return Random.fromFrequencyMap(options);
  }

  function getBreastsWord(breasts) {
    return EnglishHelper.pluralize(getBreastWord(breasts));
  }

  function sizeWord(size) {
    return Random.fromFrequencyMap(sizeWords[size]);
  }

  function firmnessWord(firmness) {
    return Random.fromFrequencyMap(firmnessWords[firmness]);
  }

  function shapeWord(shape) {
    return Random.fromFrequencyMap(shapeWords[shape]);
  }

  // Consider shape
  //   normal: 80,
  //   puffy: 15,
  //   inverted: 5,
  //   teat: 0,

  // Nipple Sizes
  //   'nippleWidth',
  //   'nippleLength',
  //   'areolaWidth',

  // And Color
  //   'nippleShade',

  // nipples, teats, nubs, buds, peaks, tips
  function shortNippleDescription(breasts) {
    return `[THICK NIPPLES]`;
  }

  function hardNippleDescription(breasts) {
    return `[HARD THICK NIPPLES]`;
  }

  return {
    breastWord,
    breastsWord,
    weave
  };

})();
