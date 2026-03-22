global.BreastsDescriber = (function() {

  function getTemplate(id) {
    const breasts = BreastsComponent.lookup(id);
    const shape = breasts.breastShape;
    const volume = breasts.absoluteBreastVolume;
    const pounds = MeasurementHelper.gramsToPounds(volume);

    const options = [];

    if (shape === 'flat') {
      options.push(`{C:name's} {breasts} are almost completely flat, barely rising above {C:his} chest.`);
      options.push(`{C:name's} chest is completely flat, similar to an adolescent boy.`);
      options.push(`{C:name's} chest is washboard flat, without any noticeable {breasts} at all.`);
    }

    if (shape === 'tiny-balls') {
      options.push(`{C:name's} tiny breasts are firm and round, barely as
        large as {C:breasts.apples}.`);
      options.push(`Tiny round mounds sit high on {C:name's} chest,
        no larger than {C:breasts.apples} and perfectly spherical.`);
      options.push(`Tiny perfectly rounded mounds sit high on {C:name's}
        chest like {C:breasts.apples}, jutting forward, firm and unyielding.`);
      options.push(`{C:name's} tiny {breasts} are compact and noticeably
        spherical even at their modest size, each small {C:breasts.breast} no
        larger than {C:breasts.anApple}.`);
    }

    if (shape === 'pancakes') {
      options.push(`Though {C:name} does have {breasts}, they're soft and
        wide, barely noticeable swells over {C:his} lean chest.`);
      options.push(`{C:name's} {breasts} are almost completely flat,
        offering only the faintest soft swell against {C:his} chest.`);
      options.push(`{C:name's} {breasts} are almost completely flat against
        {C:his} chest, showing only the softest, slightest feminine swell.`);
    }

    // TODO: Tiny breasts of medium firmness. These are difficult to describe, basically A cup breasts that are wide
    //   and soft. They're not firm enough to be pert and round, but not wide enough that they disappear completely.
    if (shape === `tiddys`) {
      options.push('TODO[tiddys]')
    }

    if (shape === 'pert') {
      options.push(`{C:name's} {breasts} form tiny, firm cones that jut
        forward from {C:his} chest, defying gravity despite their modest size.`);
      options.push(`{C:name's} tiny {breasts} form delicate, youthful buds
        that sit high and tight on {C:his} chest, barely swelling outward.`);
      options.push(`{C:name's} small, dainty peaks rise gently from {C:his}
        chest, firm and delicately pointed.`);
    }

    if (shape === 'small-balls') {
      options.push(`{C:name's} {breasts} small firm breasts form compact,
        perfectly rounded spheres that rest high and proud on {C:his} chest.`);
    }

    if (shape === 'teardrops') {
      options.push(`{C:name's} {breasts} are like small gentle teardrops, hanging
        with a slight downward curve and swaying subtly with {C:his} movements.`)
    }

    if (shape === 'conical') {
      options.push(`{C:name's} {breasts} form small, upward pointing cones
        that jiggle slightly when {C:he} moves.`);
    }

    if (shape === 'tubular') {
      options.push(`{C:name's} firm {breasts}, project outward in narrow,
        tube-like shapes, elongated and pointed rather than rounded.`);
    }

    if (shape === 'balls') {
      options.push(`{C:name's} small {breasts} are round and firm, each
        about the size of {C:breasts.anApple}.`);
    }

    if (shape === 'swingers') {
      options.push(`{C:name's} soft, {C:breasts.apple} sized {breasts} swell 
        forward in a soft, gentle curve before dropping into a heavy natural sag.`);
      options.push(`{C:name's} {C:breasts.apple} sized {breasts} look 
        incredibly soft, swinging from side to side {C:his} every movement.`)
    }

    if (shape === 'average') {
      options.push(`{C:name's} {breasts} form a soft, classic teardrop shape, 
        full at the bottom and tapering gently upward with a natural, relaxed curve.`)
      options.push(`Full and softly rounded, {C:name's} {C:breasts.apple} sized 
        {breasts} sway heavily with {C:his} every movements.`)
      options.push(`Perfectly balanced, {C:breasts.apple} sized {breasts} adorn {C:name's} chest,
        round and full, with a subtle lift that gives them a harmonious, natural appearance.`)
      options.push(`{C:name's} {C:breasts.apple} sized {breasts} flare into a gentle bell 
        shape, widening toward the base with a soft, inviting fullness.`)
      options.push(`{C:name's} {breasts} are full and round, each about the 
        size of {C:breasts.anApple} they hang like soft swaying bells.`)
    }

    if (options.length === 0) {
      options.push(`[TODO:${breasts.breastShape}]`);
    }

    const start = Random.from(options);
    const weight = (pounds > 1.5) ? describeWeight(breasts) : '';

    return `${start} ${weight}`;
  }

  function describeWeight(breasts) {
    const firmness = breasts.breastFirmness;
    const volume = breasts.absoluteBreastVolume;

    console.log("Volume:",volume)

    const pounds = MeasurementHelper.gramsToPounds(volume);
    const weight = breastWeight(firmness, volume);
    const options = [];

    options.push(`{C:His} {C:breasts.bigRoundBreasts} weigh just over ${weight} each.`);
    options.push(`{C:his} {C:breasts.bigRoundBreasts} carry a warm ${weight} heft each.`);
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
          smallest motion, you'd guess that each {C:breasts.bigBreast} weighs at least ${weight}.`);
      }
    }

    return Random.from(options);
  }

  // Functional minimum of around 75ml, practically though this function shouldn't be used to describe breasts of less
  // than average size.
  function breastWeight(firmness, volume) {
    const grams = volume * BreastData.BreastFirmness[firmness];
    const ounces = MeasurementHelper.gramsToOunces(grams);

    if (ounces < 2) { throw `These tits are too small to describe by weight`; }

    return MeasurementHelper.gramsToPounds(grams) > 0 ?
      MeasurementHelper.poundsWithFraction(grams) :
      `${EnglishHelper.numberInEnglish(ounces)} ounces`;
  }

  // Some shapes (flat/pancake) don't have a round object with which to compare, so the caller of this function should
  // expect to handle a null result for some sizes.
  function sizeShapeComparison(shape, volume) {
    switch (shape) {
      case 'tiny-balls': return compareTinyBalls(volume);
      case 'pert': return comparePert(volume);
      case 'small-balls': return compareSmallBalls(volume);
      case 'teardrops': return compareTeardrops(volume);
      case 'conical': return compareConical(volume);
      case 'balls': return compareBalls(volume);
      case 'tubular': return compareTubular(volume);
      case 'swingers': return compareSwingers(volume);
      case 'average': return compareAverage(volume);
      case 'perky': return comparePerky(volume);
      case 'torpedoes': return compareTorpedoes(volume);
      case 'dangling': return compareDangling(volume);
      case 'heavy-bells': return compareHeavyBells(volume);
      case 'big-round': return compareBigRound(volume);
      case 'pendulous': return comparePendulous(volume);
      case 'hangers': return compareHangers(volume);
      case 'cow-tits': return compareCowTits(volume);
      case 'bimbo': return compareBimbo(volume);
    }
  }

  // 0 - 200 ml / firm
  function compareTinyBalls(volume) {
    if (volume < 50) { return Random.from([`strawberry`,'large walnut','tiny lime','tiny lemon']) }
    if (volume < 100) { return Random.from(['small lime','small lemon','small tart plum',`large hen's egg`,
      'plump apricot','ripe lemon','ripe lime']); }
    if (volume < 150) { return Random.from(['ripe lemon','ripe lime','tiny pear','tiny apple','firm young peach',
      'ripe plum','small orange','large apricot']); }
    return Random.from(['small green apple','plump peach','large plum','ripe orange']);
  }

  // 200 - 400 ml / firm
  function comparePert(volume) {
    if (volume < 250) { return Random.from(['firm young pear', 'tiny pinecone']); }
    if (volume < 300) { return Random.from(['ripe pear','small mango','small pinecone']); }
    if (volume < 350) { return Random.from(['large pear','tiny eggplant','small mango','pinecone']); }
    return Random.from(['overgrown pear','small eggplant','ripe mango','pinecone']);
  }

  // 200 - 400 ml / firm
  function compareSmallBalls(volume) {
    if (volume < 250) { return Random.from(['ripe apple','juicy peach','juicy orange','freshly baked roll']); }
    if (volume < 300) { return Random.from(['plump apple','large peach','plump orange','large bread roll']); }
    if (volume < 350) { return Random.from(['large apple','large orange','plump bread roll']); }
    return Random.from(['overgrown apple','overgrown orange','large cinnamon roll','small grapefruit']);
  }

  // 400 - 700 ml / soft
  function compareTeardrops(volume) {
    if (volume < 550) { return Random.from(['juicy mango', 'ripe eggplant', 'leather belt pouch']); }
    return Random.from(['large juicy mango','large juicy eggplant','full wineskin']);
  }

  // 400 - 700 ml / medium
  function compareConical(volume) {
    if (volume < 550) { return Random.from(['large pinecone','ripe eggplant']); }
    return Random.from(['huge pinecone','large juicy eggplant']);
  }

  // 400 - 700 ml / firm
  function compareBalls(volume) {
    if (volume < 550) { return Random.from(['juicy grapefruit']); }
    return Random.from(['large ripe grapefruit']);
  }

  // 400 - 700 ml / firm / narrow
  function compareTubular(volume) {
    if (volume < 550) { return Random.from(['leather flask','small wine bottle']); }
    return Random.from(['small ale tankard','full wineskin','bottle of wine']);
  }

  // 700 - 1,200 ml / soft
  function compareSwingers(volume) {
    if (volume < 1000) { return Random.from(['heavy wineskin','ale tankard']); }
    return Random.from(['heavy tavern tankard','bulging wineskin','large wine decanter']);
  }

  // 700 - 1,200 ml / medium
  function compareAverage(volume) {
    if (volume < 1000) { return Random.from(['overgrown grapefruit']); }
    return Random.from(['young cantaloupe','small cantaloupe','small honeydew melon']);
  }

  // 700 - 1,200 ml / firm
  function comparePerky(volume) {
    if (volume < 1000) { return Random.from(['full powder horn','large drinking horn']); }
    return Random.from(['young pineapple','small pineapple']);
  }

  // 700 - 1,200 ml / firm / narrow
  function compareTorpedoes(volume) {
    if (volume < 1000) { return Random.from(['large wine bottle']); }
    return Random.from(['oversized wine bottle']);
  }

  // 1,200 - 2,000 / soft
  function compareDangling(volume) {
    if (volume < 1600) { return Random.from(['small pineapple']); }
    return Random.from(['ripe pineapple','juicy pineapple']);
  }

  // 1,200 - 2,000 / medium
  function compareHeavyBells(volume) {
    if (volume < 1600) { return Random.from(['small pineapple']); }
    return Random.from(['ripe pineapple','juicy pineapple']);
  }

  // 1,200 - 2,000 / firm
  function compareBigRound(volume) {
    if (volume < 1600) { return Random.from(['young coconut','juicy cantaloupe','ripe honeydew melon']); }
    return Random.from(['small coconut','ripe cantaloupe','juicy honeydew melon']);
  }

  // 2,000 - 5,000 / soft
  function comparePendulous(volume) {
    if (volume < 3000) { return Random.from(['ripe pineapple','juicy pineapple','small oblong watermelon']); }
    if (volume < 4000) { return Random.from(['large pineapple','big pineapple','small elongated watermelon',
      'small elongated pumpkin']); }
    return Random.from(['huge pineapple','overgrown pineapple','ripe watermelon','ripe pumpkin']);
  }

  // 2,000 - 5,000 / medium
  function compareHangers(volume) {
    if (volume < 3000) { return Random.from(['ripe pineapple','juicy pineapple','small oblong watermelon']); }
    if (volume < 4000) { return Random.from(['large pineapple','big pineapple','small elongated watermelon',
      'small elongated pumpkin']); }
    return Random.from(['huge pineapple','overgrown pineapple','ripe watermelon','ripe pumpkin']);
  }

  // 2,000 - 5,000 / medium
  function compareCowTits(volume) {
    if (volume < 3000) { return Random.from(['ripe coconut','big juicy cantaloupe','big juicy honeydew melon',
      'ripe watermelon']); }
    if (volume < 4000) { return Random.from(['swollen coconut','huge cantaloupe','swollen honeydew melon',
      'swollen watermelon','small swollen pumpkin']); }
    return Random.from(['bulging coconut','bulging honeydew melon','bulging watermelon','ripe pumpkin']);
  }

  // 2,000 - 5,000 / firm
  function compareBimbo(volume) {
    if (volume < 3000) { return Random.from(['ripe coconut','big juicy cantaloupe','big juicy honeydew melon',
      'small round watermelon']); }
    if (volume < 4000) { return Random.from(['large coconut','huge cantaloupe','huge honeydew melon',
      'ripe round watermelon','small pumpkin']); }
    return Random.from(['large ripe coconut','overgrown honeydew melon','round juicy watermelon','ripe pumpkin']);
  }

  return Object.freeze({
    getTemplate,
    breastWeight,
    sizeShapeComparison,
  });

})();

/*



perky (average/firm)
  Her firm, modestly sized breasts form round perky hemispheres, sitting high on her torso, and lifting upward with almost no sag.

torpedos (average/firm)
  Her firm breasts project forward in an elongated torpedo shape, sloping gently downward with noticeable weight.
  Her firm breasts extend forward in an elongated shape that slopes gently downward, carrying a subtle forward projection.
  Her long firm breasts extend outward in a somewhat torpedo-like form, sloping forward but yielding noticeably to gravity.
  Her breasts project sharply forward in a firm, elongated torpedo shape, maintaining a pointed, upward-angled profile with minimal sag.

---

dangling (big/soft)
  Her breasts look large and heavy, dangling udders that swing freely with every step, stretching downward under their own weight.
  Heavy and sack-like, her breasts sway pendulously, slapping softly against her ribs when she moves.
  Her ripe, drooping melons hang low from her chest, their weight pulling them into a lewd, swaying arc that begs to be grabbed.

heavyBells (big/medium)
  Her large breasts form heavy bells, swinging and pulling downward, creating deep cleavage and a soft, pendulous bounce.
  Her big, bouncing globes dominate her frame, rolling and shifting with every motion in a hypnotic, fleshy display.
  Deep, plunging cleavage forms where her breasts drop heavily together, slapping together heavily when she leans forward.

bigRound (big/firm)
  Her large breasts form big rounded orbs that remain surprisingly high and firm.
  Her big round breasts thrust sharply forward, high and firm.
  Taut, bulging orbs sit proud and unyielding on her chest, straining against gravity and practically demanding attention.

---

pendulous (huge/soft)
  Enormous pendulous teardrops hang low, swaying heavily and brushing against her torso with each motion.

hangers (huge/medium)
  Her huge breasts hang deeply and heavily from her chest, creating a pronounced lower curve and soft, rolling bounce with each step.
  Massive and full, her breasts drop low under their own weight, forming generous, swaying orbs that dominate her silhouette.

cowTits (huge/medium)
  Massive, cow-like udders sag deeply, their sheer weight causing them to swing and slap together.
  Massive, heavy breasts hang low and full, swaying pendulously with every movement like swollen udders.
  Massive breasts hang low and full, swaying heavily with every movement and creating a pronounced, pendulous curve.

bimbo (huge/firm)
  Huge, impossibly round and high-set globes jut forward like exaggerated bimbo implants, barely yielding to gravity.
  Huge, impossibly round and high-set globes thrust forward, taut and defiant against gravity.
  Huge, impossibly round breasts thrust forward and upward, remaining taut and high despite their extraordinary size.

---

elongatedSacks (monster/soft)
  Colossal, elongated sacks dangle almost to her waist, stretching and swinging with hypnotic motion.

massiveBells (monster/medium)
  Monstrously heavy bells dominate her frame, hanging low with deep cleavage and overwhelming presence.

strainingRound (monster/firm)
  Gigantic, straining rounded spheres sit improbably high, taut and bulging against their own mass.

*/
