global.BreastsDescriber = (function() {

  function getTemplate(id) {
    const breasts = BreastsComponent.lookup(id);
    const shape = breasts.breastShape;
    const volume = breasts.absoluteBreastVolume;
    const pounds = MeasurementHelper.gramsToPounds(volume);

    const shapeDescription = descriptionForShape(shape);
    const weightDescription = (pounds > 1.5) ? describeWeight(breasts) : '';
    return `${shapeDescription} ${weightDescription}`;
  }

  function descriptionForShape(shape) {
    switch (shape) {
      case 'flat': return describeFlat();
      case 'tiny-balls': return describeTinyBalls();
      case 'pancakes': return describePancakes();
      case 'tiddys': return describeTiddys();
      case 'pert': return describePert();
      case 'small-balls': return describeSmallBalls();
      case 'teardrops': return describeTeardrops();
      case 'conical': return describeConical();
      case 'balls': return describeBalls();
      case 'tubular': return describeTubular();
      case 'swingers': return describeSwingers();
      case 'average': return describeAverage();
      case 'perky': return describePerky();
      case 'torpedoes': return describeTorpedoes();
      case 'dangling': return describeDangling();
      case 'heavy-bells': return describeHeavyBells();
      case 'big-round': return describeBigRound();
      case 'pendulous': return describePendulous();
      case 'hangers': return describeHangers();
      case 'cow-tits': return describeCowTits();
      case 'bimbo': return describeBimbo();
      case 'elongated-sacks': return describeElongatedSacks();
      case 'massive-bells': return describeMassiveBells();
      case 'straining-round': return describeStrainingRound();
    }
  }

  function describeWeight(breasts) {
    const firmness = breasts.breastFirmness;
    const volume = breasts.absoluteBreastVolume;

    const pounds = MeasurementHelper.gramsToPounds(volume);
    const weight = breastWeight(firmness, volume);
    const options = [];

    options.push(`{C:His} {C:breasts.bigRoundBreasts} weigh just over ${weight} each.`);
    options.push(`{C:His} {C:breasts.bigRoundBreasts} carry a warm ${weight} heft each.`);
    options.push(`You'd estimate that each of {C:his} {C:breasts.bigBreasts} weigh at least ${weight}.`);

    if (pounds > 5) {
      options.push(`Each of {C:his} {C:breasts.bigBreasts} have to weigh at least ${weight}. They rest 
        heavily on {C:his} ribcage giving {C:his} figure an undeniably lewd shape.`);
    }

    if (BreastData.SaggyShapes.includes(breasts.breastShape)) {
      if (pounds > 4) {
        options.push(`{C:His} pair of heavy ${weight} {C:breasts.breasts} hang with a gentle pendulous curve, their
          substantial weight pulling them downward in slow, hypnotic arcs as {C:he} shifts {C:his} posture.`);
      }
      if (pounds > 8) {
        options.push(`From the way {C:his} {C:breasts.bigBreasts} hang low and full, swaying ponderously with the 
          smallest motion, you'd guess that each {C:breasts.big} {C:breasts.breast} weighs at least ${weight}.`);
      }
    }

    return Random.from(options);
  }

  // Functional minimum of around 75ml, practically though this function shouldn't be used to describe breasts of less
  // than average size.
  function breastWeight(firmness, volume) {
    const grams = volume * BreastData.BreastFirmness[firmness];
    const ounces = MeasurementHelper.gramsToOunces(grams);

    if (ounces < 2) { throw new Error(`These tits are too small to describe by weight`); }

    return MeasurementHelper.gramsToPounds(grams) > 0 ?
      MeasurementHelper.poundsWithFraction(grams) :
      `${EnglishHelper.numberInEnglish(ounces)} ounces`;
  }

  // =======================================
  //    Size and Shape Specific Functions
  // =======================================

  // 0 - 200 ml / medium,soft
  function describeFlat() {
    return Random.from([
      `{C:name's} chest is completely flat, like an adolescent boy.`,
      `{C:name's} {breasts} are almost completely flat, barely rising above {C:his} chest.`,
      `{C:name's} chest is washboard flat, without any noticeable {breasts} at all.`,
    ]);
  }

  // 0 - 200 ml / firm
  function describeTinyBalls() {
    const options = [];
    options.push(`{C:name's} tiny breasts are firm and round, barely as large as {C:breasts.apples}.`);
    options.push(`Tiny round mounds sit high on {C:name's} chest, no larger
      than {C:breasts.apples} and perfectly spherical.`);
    options.push(`Tiny perfectly rounded mounds sit high on {C:name's} chest
      like {C:breasts.apples}, jutting forward, firm and unyielding.`);
    options.push(`{C:name's} tiny {breasts} are compact and noticeably spherical even at
      their modest size, each small {C:breasts.breast} no larger than {C:breasts.anApple}.`);
    return Random.from(options);
  }

  // 200 - 400 ml / soft
  function describePancakes() {
    const options = [];
    options.push(`Though {C:name} does have {breasts}, they're soft and wide,
      barely noticeable swells over {C:his} lean chest.`);
    options.push(`{C:name's} {breasts} are almost completely flat, offering
      only the faintest soft swell against {C:his} chest.`);
    options.push(`{C:name's} {breasts} are almost completely flat against
      {C:his} chest, showing only the softest, slightest feminine swell.`);
    return Random.from(options);
  }

  // 200 - 400 ml / medium
  function describeTiddys() {
    const options = [];
    options.push(`{C:name's} {C:breasts.bigSoftBreasts} spread across {C:his} chest in a soft, generous sweep.`);
    options.push(`Small and spread wide, {C:name's} {breasts} rest like two soft pillows against {C:his} chest.`);
    options.push(`{C:name's} small {breasts} form a gentle, wide swell across {C:his}
      ribcage; each one soft and heavy enough to drape slightly outward.`);
    options.push(`{C:name's} {C:breasts.softBreasts} sit low and broad across {C:his}
      chest, their soft weight pulling them into modest, subtle teardrops.`);
    options.push(`A modest handful each, {C:name's} {C:breasts.softBreasts} are wide and softly rounded.
      They barely rise from {C:his} torso but still create a delicate shelf of soft warmth.`);
    options.push(`Small, wide, and deliciously soft, {C:name's} {C:breasts.breasts} rest against {C:his} ribs
      with a gentle outward drape, their slight firmness causing them to bounce lightly when {C:he} walks.`);
    options.push(`{C:name's} {C:breasts.softBreasts} are an epitome of understated sensuality. {C:His} little titties
      sit low and full, soft enough to ripple under your fingertips and just large enough to form two small teardrops.`);
    return Random.from(options);
  }

  // 200 - 400 ml / firm
  function describePert() {
    const options = [];
    options.push(`{C:name's} {breasts} form tiny, firm cones that jut
      forward from {C:his} chest, defying gravity despite their modest size.`);
    options.push(`{C:name's} tiny {breasts} form delicate, youthful buds
      that sit high and tight on {C:his} chest, barely swelling outward.`);
    options.push(`{C:name's} small, dainty peaks rise gently from {C:his}
      chest, firm and delicately pointed.`);
    return Random.from(options);
  }

  // 200 - 400 ml / firm
  function describeSmallBalls () {
    const options = [];
    options.push(`{C:name's} {breasts} small firm breasts form compact,
      perfectly rounded spheres that rest high and proud on {C:his} chest.`);
    return Random.from(options);
  }

  // 400 - 700 ml / soft
  function describeTeardrops () {
    const options = [];
    options.push(`{C:name's} {breasts} are like small gentle teardrops, hanging
      with a slight downward curve and swaying subtly with {C:his} movements.`);
    return Random.from(options);
  }

  // 400 - 700 ml / medium
  function describeConical() {
    const options = [];
    options.push(`{C:name's} {breasts} form small, upward pointing cones that jiggle slightly when {C:he} moves.`);
    return Random.from(options);
  }

  // 400 - 700 ml / firm
  function describeBalls() {
    const options = [];
    options.push(`{C:name's} small {breasts} are round and firm, each about the size of {C:breasts.anApple}.`);
    return Random.from(options);
  }

  // 400 - 700 ml / firm / narrow
  function describeTubular() {
    const options = [];
    options.push(`{C:name's} firm {breasts}, project outward in narrow,
        tube-like shapes, elongated and pointed rather than rounded.`);
    return Random.from(options)
  }

  // 700 - 1,200 ml / soft
  function describeSwingers() {
    const options = [];
    options.push(`{C:name's} soft, {C:breasts.appleSizedBreasts} swell
      forward in a soft, gentle curve before dropping into a heavy natural sag.`);
    options.push(`{C:name's} {C:breasts.appleSizedBreasts} look
      incredibly soft, swinging from side to side {C:his} every movement.`);
    return Random.from(options)
  }

  // 700 - 1,200 ml / medium
  function describeAverage() {
    const options = [];
    options.push(`{C:name's} {breasts} form a soft, classic teardrop shape,
      full at the bottom and tapering gently upward with a natural, relaxed curve.`);
    options.push(`Full and softly rounded, {C:name's} {C:breasts.appleSizedBreasts}
      sway heavily with {C:his} every movements.`);
    options.push(`Perfectly balanced, {C:breasts.appleSizedBreasts} adorn {C:name's} chest,
      round and full, with a subtle lift that gives them a harmonious, natural appearance.`);
    options.push(`{C:name's} {C:breasts.appleSizedBreasts} flare into a gentle bell
      shape, widening toward the base with a soft, inviting fullness.`);
    options.push(`{C:name's} full, round breasts are as big as {C:breasts.apples},
      and hang like soft swaying bells.`);
    return Random.from(options)
  }

  // 700 - 1,200 ml / firm
  function describePerky () {
    const options = [];
    options.push(`{C:name's} {C:breasts.soft} {C:breasts.appleSizedBreasts} form round
      perky hemispheres, sitting high on {C:his} torso, lifting upward with almost no sag.`);
    return Random.from(options);
  }

  // 700 - 1,200 ml / firm / narrow
  function describeTorpedoes() {
    const options = [];
    options.push(`{C:name's} {C:breasts.softBreasts} project forward,
      strangely elongated despite their size and weight.`);
    options.push(`{C:name's} {C:breasts.softBreasts} extend forward in an
      elongated shape that slopes gently downwards.`);
    options.push(`{C:name's} long {C:breasts.softBreasts} project
      dramatically outward before gently yielding to gravity.`);
    options.push(`{C:name's} {C:breasts.bigBreasts} project sharply forward
      in a firm, elongated shape, maintaining a pointed, upward-angled profile with minimal sag.`);
    return Random.from(options);
  }

  // 1,200 - 2,000 / soft
  function describeDangling() {
    const options = [];
    options.push(`{C:name's} {C:breasts.appleSizedBreasts} look huge on {C:his} frame,
      dangling udders that swing freely with every step, stretching downward under their own weight.`);
    options.push(`Heavy and sack-like, {C:name's} {C:breasts.bigBreasts} sway
      pendulously, slapping softly against {C:his} ribs when {C:he} moves.`);
    options.push(`{C:name's} ripe, drooping {C:breasts.breasts} hang low from {C:his} chest,
      their weight pulling them into lewd, swaying arcs that beg to be grabbed or slapped.`);
    return Random.from(options);
  }

  // 1,200 - 2,000 / medium
  function describeHeavyBells () {
    const options = [];
    options.push(`{C:name's} {C:breasts.bigBreasts} form heavy {C:breasts.appleSized} bells,
      swinging and pulling downward, creating deep cleavage and a soft, pendulous sway.`);
    options.push(`{C:name's} {C:breasts.big}, bouncing {C:breasts.breasts} dominate {C:his} frame,
      rolling and shifting with every motion in a hypnotic, fleshy display.`);
    options.push(`Deep, plunging cleavage forms where {C:name's} {C:breasts.appleSizedBreasts}
      hang together, slapping together heavily when {C:he} leans forward.`);
    return Random.from(options);
  }

  // 1,200 - 2,000 / firm
  function describeBigRound() {
    const options = [];
    options.push(`{C:name's} {C:breasts.bigBreasts} form big rounded {C:breasts.appleSized}
      orbs that remain surprisingly high and firm.`);
    options.push(`{C:name's} {C:breasts.bigRoundBreasts} thrust sharply forward, high and firm`);
    options.push(`Taut, bulging {C:breasts.appleSized} orbs sit high and proud on {C:name's}
      chest, straining against gravity and practically demanding attention.`);
    return Random.from(options);
  }

  // 2,000 - 5,000 / soft
  function describePendulous() {
    const options = [];
    options.push(`{C:name's} enormous dangling {C:breasts.appleSizedBreasts} hang low
      down {C:his} torso, swaying heavily and slapping against each other with each motion.`);
    return Random.from(options)
  }

  // 2,000 - 5,000 / medium
  function describeHangers() {
    const options = [];
    options.push(`{C:name's} {C:breasts.bigBreasts} hang deeply and heavily from {C:his} chest, 
      creating a pronounced lower curve and soft, rolling bounce with each step.`);
    options.push(`Massive and full, {C:name's} breasts drop low under their own weight, forming 
      generous, swaying {C:breasts.appleSized} orbs that dominate {C:his} silhouette.`);
    return Random.from(options)
  }

  // 2,000 - 5,000 / medium
  function describeCowTits() {
    const options = [];
    options.push(`{C:name's} {C:breasts.big}, cow-like udders sag deeply, their 
      sheer weight causing them to swing and slap together.`);
    options.push(`{C:name's} {C:breasts.big} heavy breasts, each the size of {C:breasts.anApple}, 
      hang low and full, swaying pendulously with every movement like swollen udders.`);
    options.push(`{C:name's} {C:breasts.big} {C:breasts.appleSizedBreasts} hang low and full,
      swaying heavily with every movement as though they needed to be milked.`);
    return Random.from(options);
  }

  // 2,000 - 5,000 / firm
  function describeBimbo() {
    const options = [];
    options.push(`{C:name's} {C:breasts.big}, impossibly round, high-set {C:breasts.breasts} jut
      forward like exaggerated bimbo implants, barely yielding to gravity.`);
    options.push(`{C:name's} {C:breasts.bigBreasts} are each easily as big as {C:breasts.anApple}.
      They're also impossibly round and high-set, taut and defiant against gravity.`);
    options.push(`{C:name's} {C:breasts.big}, impossibly round {C:breasts.breasts} jut forward
      and upward, remaining taut and high despite their extraordinary size.`);
    return Random.from(options);
  }

  // 5,000 - 10,000 / soft
  function describeElongatedSacks() {
    const options = [];
    options.push(`{C:name's} {C:breasts.bigBreasts} form colossal, elongated sacks that dangle
      almost down to {C:his} waist, stretching and swinging with hypnotic motion.`);
    return Random.from(options);
  }

  // 5,000 - 10,000 / medium
  function describeMassiveBells() {
    const options = [];
    options.push(`Monstrously heavy, bell shaped {C:breasts.breasts} dominate {C:name's} frame,
      hanging low with impossibly deep cleavage that you could get lost within.`);
    return Random.from(options);
  }

  // 5,000 - 10,000 / firm
  function describeStrainingRound () {
    const options = [];
    options.push(`{C:name's} gigantic {C:breasts.breasts}, sit improbably high; 
      deeply veined, straining, taut, and bulging against their own mass.`);
    return Random.from(options);
  }

  return {
    getTemplate,
    breastWeight,
  };

})();
