global.BreastsLoom = (function() {

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

  const saggyShapes = ['swingers','dangling','heavy-bells','pendulous','hangers','elongated-sacks','massive-bells'];

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
  // {A:breasts:thickNipples} A phrase like 'long nipples' or 'dark teats'
  function weave(id, token) {
    const breasts = BreastsComponent.lookup(id);

    if (token === 'bigSoftBreasts') {
      return `${sizeWord(breasts.breastSize)} ${firmnessWord(breasts.breastFirmness)} ${breastsWord(breasts)}`; }
    if (token === 'bigBreasts') {
      return `${sizeWord(breasts.breastSize)} ${breastsWord(breasts)}`; }
    if (token === 'softBreasts') {
      return `${firmnessWord(breasts.breastFirmness)} ${breastsWord(breasts)}`; }
    if (token === 'bigRoundBreasts') {
      return `${sizeWord(breasts.breastSize)} ${shapeWord(breasts.breastShape)} ${breastsWord(breasts)}`; }
    if (token === 'bigSoft') {
      return `${sizeWord(breasts.breastSize)} ${firmnessWord(breasts.breastFirmness)}`; }
    if (token === 'bigRound') {
      return `${sizeWord(breasts.breastSize)} ${shapeWord(breasts.breastShape)}`; }

    if (token === 'big') { return sizeWord(breasts.breastSize); }
    if (token === 'soft') { return firmnessWord(breasts.breastFirmness); }
    if (token === 'round') { return shapeWord(breasts.breastShape); }
    if (token === 'breast') { return breastWord(breasts); }
    if (token === 'breasts') { return breastsWord(breasts); }
    if (token === 'thickNipples') { return shortNippleDescription(breasts); }

    return Weaver.formatError(`[Breasts:${token}]`);
  }

  // Unlike the {breast} token (which usually resolves to "breast" or "tit") this breast word function takes the
  // breast size and shape and shape into consideration as well. This is needed for words like "udder", which imply a
  // certain size, or "hanger" which imply a large saggy tit. These words are all easily pluralizable so the
  // breastsWord() function can just call this and add an 's' to the output.
  function breastWord(breasts) {
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

    if (saggyShapes.includes(breasts.breastShape)) {
      options['swinger'] = 3;
      options['hanger'] = 3;
    }

    return Random.from(options);
  }

  function breastsWord(breasts) {
    return EnglishHelper.pluralize(breastWord(breasts));
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

  return Object.freeze({ weave });

})();
