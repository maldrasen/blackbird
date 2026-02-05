Weaver.TitsLoom = (function() {

  // Replaces token placeholders in the form of:
  //   {{actor::tits.sizeAndShape}}
  //
  function findValue(subject, token, context) {
    if (context.get(subject) == null) { return Weaver.error(`Subject(${subject}) not in context`); }

    let body = context.get(subject).body;
    let tits = context.get(subject).tits;

    if (token == "tits.sizeAndShape") { return sizeAndShape(tits); }
    if (token == "tits.sizeShape")    { return sizeShape(tits); }
    if (token == "tits.size")         { return size(tits); }
    if (token == "tits.shape")        { return shape(tits); }
    if (token == "tits.sizeComp")     { return sizeComp(tits,false); }
    if (token == "tits.sizeComps")    { return sizeComp(tits,true); }
    if (token == "tits.smashShape")    { return tits.smashShape; }
    if (token == "tits.smashPlace")    { return tits.smashPlace; }

    return Weaver.error(`Bad tits token(${token})`);
  }

  function sizeAndShape(tits) { return `${size(tits)} and ${shape(tits)}` }
  function sizeShape(tits) { return `${size(tits)} ${shape(tits)}` }

  function size(tits) {
    return Random.from({
      zero:    ['miniature','boyish','undeveloped','minimal'],
      tiny:    ['tiny','tiny','tiny','little','little','very small','petite'],
      small:   ['small','small','small','little','little','cute'],
      average: ['average','nice','normal','typical','medium'],
      big:     ['big','big','big','large','large','fat','wide','heavy','ample','sizable'],
      huge:    ['huge','huge','huge','very large','very big','giant','massive'],
      monster: ['gigantic','immense','enormous','titanic','colossal','gargantuan','monstrous'],
    }[tits.currentSizeClass]);
  }

  function shape(tits) {
    return Random.from({
      flat:     ['flat','boyish','nonexistent'],
      bell:     ['heavy','swinging','bulbous','bell shaped'],
      conical:  ['conical','cone shaped','tapered','pointed','pointy','pear shaped'],
      dangling: ['dangling','soft','swaying','sagging'],
      perky:    ['perky'],
      round:    ['round','plump','shapely','full','apple shaped'],
    }[tits.shape]);
  }

  function sizeComp(tits, plural) {
    if (tits.size < 33)   { return `slightly smaller than ${tinyComp(plural)}` }
    if (tits.size < 66)   { return `about as large as ${tinyComp(plural)}` }
    if (tits.size < 100)  { return `slightly larger than ${tinyComp(plural)}` }
    if (tits.size < 133)  { return `slightly smaller than ${smallComp(plural)}` }
    if (tits.size < 166)  { return `about as large as ${smallComp(plural)}` }
    if (tits.size < 200)  { return `slightly larger than ${smallComp(plural)}` }
    if (tits.size < 233)  { return `slightly smaller than ${averageComp(plural)}` }
    if (tits.size < 266)  { return `about as large as ${averageComp(plural)}` }
    if (tits.size < 300)  { return `slightly larger than ${averageComp(plural)}` }
    if (tits.size < 400)  { return `a bit smaller than ${largeComp(plural)}` }
    if (tits.size < 500)  { return `about as large as ${largeComp(plural)}` }
    if (tits.size < 600)  { return `bigger than ${largeComp(plural)}` }
    if (tits.size < 733)  { return `a bit smaller than ${hugeComp(plural)}` }
    if (tits.size < 866)  { return `about as large as ${hugeComp(plural)}` }
    if (tits.size < 1000) { return `bigger than ${hugeComp(plural)}` }
    if (tits.size < 1500) { return `far larger than ${hugeComp(plural)}` }
    if (tits.size < 2000) { return `twice the size of ${hugeComp(plural)}` }
    if (tits.size < 3000) { return `three times as large as ${hugeComp(plural)}` }
    return Weaver.error(`Can't compare tit size above 3000.`)
  }

  function tinyComp(plural) {
    return plural ?
      aPairOf() + Random.from(['lemons','limes','plums','avacados','tomato']) :
      Random.from(['a lemon','a lime','a plum','an avacado','half an apple','half an orange','a tomato'])
  }

  function smallComp(plural) {
    return plural ?
      aPairOf() + Random.from(['oranges','peaches','apples','pears']) :
      Random.from(['an orange','a peach','an apple','a pear',])
  }

  function averageComp(plural) {
    return plural ?
      aPairOf() + Random.from(['grapefruits','large oranges','large apples']) :
      Random.from(['a grapefruit','a large orange','a large apple','a handfull'])
  }

  function largeComp(plural) {
    return plural ?
      aPairOf() + Random.from(['heads of lettuce','coconuts','heads of cabbage']) :
      Random.from(['half a watermelon','a head of lettuce','a coconut','a head of cabbage'])
  }

  function hugeComp(plural) {
    return plural ?
      aPairOf() + Random.from(['watermelons','winter mellons','pumpkins','pineapples','honeydew mellons']) :
      Random.from(['a watermelon','a winter mellon','a pumpkin','their head','a pineapple','a honeydew mellon'])
  }

  function aPairOf() { return Random.from(['a couple of','a pair of','two']) }

  return { findValue };

})();
